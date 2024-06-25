'use client'
import { Button } from '@/app/components/Product/styled/Buttons'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../../styles/product.module.css'
import { IProduct } from '@/app/types'
import useAppStore from '@/app/state/app'

interface IProductInputs {
  name: string
  price: number
  amount: number
}

interface IAddProductFormProps {
  handleCreated: (status: boolean) => void
}

function AddProductForm({ handleCreated }: IAddProductFormProps) {
  const addProduct = useAppStore((store) => store.addProduct)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IProductInputs>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<IProductInputs> = (data) => {
    if (Number(data.amount) > 0 && Number(data.price) > 1 && data.name.length >= 4) {
      const newProduct: IProduct = {
        name: data.name,
        price: Number(data.price),
        amount: Number(data.amount),
        id: crypto.randomUUID(),
      }

      addProduct(newProduct)
      handleCreated(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Product Name"
          {...register('name', { required: true, minLength: 4 })}
        />
        {errors.name?.type === 'required' && <span>This field is required</span>}
        {errors.name?.type === 'minLength' && <span>This field must be at least 4 characters</span>}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="number"
          placeholder="Price"
          min={1}
          {...register('price', { required: true, min: 1 })}
        />
        {errors.price && <span>This field is required</span>}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="number"
          placeholder="amount"
          {...register('amount', { required: true, min: 1 })}
        />
        {errors.amount && <span>This field is required</span>}
      </div>
      <Button fullWidth type="submit" disabled={!isValid}>
        Create product
      </Button>
    </form>
  )
}

export default AddProductForm

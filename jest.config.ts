import type { Config } from 'jest'

const config: Config = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
    },
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!(module-to-transform)/)'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default config

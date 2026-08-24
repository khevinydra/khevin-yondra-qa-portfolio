# Juaracoding Registration System Testing

## Project Overview

This project contains Software Quality Assurance (SQA) testing documentation for the Juaracoding Registration System.

The testing was performed using manual testing methods to validate system functionality, input handling, and selected SQL Injection test scenarios.

## My Role

Software Quality Assurance (SQA) Intern – Manual Testing

## Testing Information

- Testing Type: System Integration Testing (SIT)
- Testing Method: Manual Testing
- Testing Focus: Functional Testing, Negative Testing, and SQL Injection Test Scenarios

## Testing Scope

The testing covered the following functionalities:

- User Registration
- Account Activation
- Login
- Forgot Password
- Input Validation
- Invalid Input Handling
- SQL Injection Test Scenarios

## Testing Types

- Functional Testing
- Positive Testing
- Negative Testing
- Input Validation Testing
- SQL Injection Testing

## SQL Injection Test Scenarios

Selected SQL Injection test scenarios were executed to validate how the application handled malicious or unexpected input.

The testing focused on validating whether:

- Authentication could be bypassed using SQL Injection input
- Invalid or malicious input was handled appropriately
- User input was validated by the application
- Unexpected system behavior occurred when SQL-related payloads were entered

## Test Coverage

- Total Test Cases: 37
- Positive Test Cases: 6
- Negative Test Cases: 31

## Testing Artifacts

### Test Documentation

Contains the test case documentation used during testing, including positive, negative, and SQL Injection test scenarios.

### Test Evidence

Contains selected screenshots as evidence of test case execution. The evidence is organized based on the related Test Case ID for easier traceability.

### Bug Reports

Contains screenshots and supporting evidence of identified defects during testing.

## Repository Structure

```text
01-Juaracoding-Registration-System/
├── Bug-Reports/
├── Test-Documentation/
├── Test-Evidence/
└── README.md

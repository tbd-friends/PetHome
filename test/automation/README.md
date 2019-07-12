# PetHome - Automation

This project will run the automation tests created for PetHome. 

To run the test their will need a deployed and running PetHome application. The application needs to be running with a valid SSL certificate, the default configuration points to http://localhost:5000. Check the configuration section of the ReadMe to get details on how to update this URL.

Checkout the Canopy home page to see details about what Canopy can do: https://lefthandedgoat.github.io/canopy/

## From the Command Line, in the test/automation folder

~~~ bash
# Run all tests of the automation project
dotnet run --testtype All
~~~

~~~ bash
# Get some details about what cli args can be passed in:
dotnet run -- --help
~~~

## Project Structure

### Root

The root contains some general helper functions. The main of the project is in Program.fs, this will start the browser and register the tests.
Common.fs contains some details about test structure.

#### Tag

A Tag is a description of a type of tests you may want to run, generally covering a page or set of functionality.

#### Test Type

A TestType lets you break tests up in a second way, not by functionality, but maybe by coverage, or environment. 

#### Program Arguments

- Browser: What browser you want to run the tests in.
- Tag: What tag the tests should be part of to run.
- TestType: What Coverage or environment area should be tested.

#### Tests.fs File

This is a list of all tests, checkout the file for more details on the inner workings of this file. It contains the details of each test suite broken up into the functional areas.

#### Args.fs File

This is the file that takes the arguments from the command line and puts them into a structure that will be easier to use.

### Flows Folder

This folder contains different types of functions that help with different flows of UI. These help with repetitive flows, like logging into the application, to help cut down on needing to re-implement the UI flow in the tests. 

### Pages Folder

This folder contains the pages of the application, with the functional selectors of the pages. These files should be a one to one to a functional area or page of the application. The tests can access the different areas of the page, and allow for reuse of the page elements in other tests for different types of validation and test flows.

### Tests Folder

This folder contains all the tests of that should be ran against the application. The tests should be configured in two main areas, Assertions and Actions.
Assertions should be only validation that a page contains the expected structure and layout.
Actions can be used to test different type of page functionality, like registering a user and validation all fields that are required trigger certain error messages.
Also in the Tests folder are a some _templates, the files here contains some example usage of the different features of Canopy.

## Test Configuration

You can create a TestingProps.json file that cna be used to edit the configuration used by the test.
Checkout the sample.TestingProps.json file for details about how the file should be structured.
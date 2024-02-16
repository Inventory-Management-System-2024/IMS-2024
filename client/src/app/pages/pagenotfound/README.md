# 404 Page Not Found Component

## Overview

The 404 Page Not Found Component is a user interface element designed to inform users that the requested page could not be found. It is typically used in web applications to handle situations where users attempt to access a page that does not exist.

## Usage

This component is displayed when a user navigates to a URL that does not correspond to any available page within the application.

## Structure

- Container: Represents the outermost wrapper of the component.
  - Class: page_404.
- Container Content:
  - Row: Represents a row within the container.
    - Column: Represents a column within the row.
      - Text Center: Aligns content horizontally to the center.
        - 404 Background: Displays a visually distinctive background with the "404" text centered.
          - Text: "404" indicating the error code.
        - Content Box: Contains the main content of the component.
          - Heading: "Look like you're lost".
          - Subheading: "The page you are looking for is not available!".
          - Link: "Go to Dashboard" provides a link to redirect users to the dashboard page.

## Functionality

- The component is displayed when a user attempts to access a non-existent page within the application.
- It provides a clear indication of the error with the "404" code and accompanying message.
- Users are given the option to navigate back to the dashboard by clicking on the provided link.

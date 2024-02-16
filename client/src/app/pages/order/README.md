# Order Component Documentation

# AddOrderComponent Documentation

## Overview:

The AddOrderComponent is an Angular component responsible for adding orders. It is designed to be used within a Material Dialog for a seamless user experience. This component allows users to select products, set quantities, and define the order status. The selected order information is then passed back to the calling component through the dialog reference.

## Properties:

- **`productlist:`** Holds the list of products fetched from the ProductService.
- **`selectedOrderStatus:`** Represents the selected order status.
- **`selectedProduct:`** Represents the selected product for an order.
- **`selectedDate:`** Represents the selected date for the order.
- **`option:`** Holds the finalized order details before closing the dialog.
- **`product_data:`** Holds information about the selected product.
- **`orderItems:`** An array of OrderItem objects, each representing a product and its quantity in the order.

## Methods:

- constructor(ps: ProductService, dialogRef: MatDialogRef<AddOrderComponent>, @Inject(MAT_DIALOG_DATA) data: any):
  - Initializes the component.
  - Fetches the list of products from the ProductService and stores it in productlist.
- **`onNoClick():`** Closes the dialog without saving the order.
- **`onYesClick():`**
  - Calculates the total price for the order based on selected products and quantities.
  - Prepares the option object containing order details.
  - Closes the dialog and passes the option back to the calling component.
- **`addProduct():`** Adds a new OrderItem to the orderItems array.

## Dependencies:

- **`MatDialogModule:`** Material module for dialogs.
- **`MatFormFieldModule:`** Material module for form fields.
- **`MatInputModule:`** Material module for input fields.
- **`MatSelectModule:`** Material module for select dropdowns.
- **`MatIconModule:`** Material module for icons.
- **`FormsModule:`** Angular module for two-way data binding.
- **`CommonModule:`** Angular module for common directives.

##

# DeleteDialogComponent Documentation

## Overview:

The DeleteDialogComponent is an Angular component designed for confirming deletion actions within an application. This component is typically used within a Material Dialog, providing a standardized confirmation dialog for delete operations. It allows users to confirm or cancel the deletion action.

## Methods:

- constructor(dialogRef: MatDialogRef<DeleteDialogComponent>):

  - Initializes the component with a reference to the Material Dialog.

- **`onNoClick():`** Closes the dialog without confirming the deletion action by calling dialogRef.close(false).
- **`onYesClick():`** Confirms the deletion action and closes the dialog by calling dialogRef.close(true).

## Dependencies:

- MatDialogModule: Material module for dialogs.

##

# UpdateDialogComponent Documentation

## Overview:

The UpdateDialogComponent is an Angular component used for updating or modifying data within an application. This component is typically employed within a Material Dialog to facilitate a standardized interface for user interactions. It allows users to confirm or cancel the update action.

## Properties:

- **`selectedOption:`** Holds the selected option or value to be updated. It is bound to the input fields or dropdowns within the dialog.

## Methods:

- constructor(dialogRef: MatDialogRef<UpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any):

  - Initializes the component with a reference to the Material Dialog and injected data.

- **`onNoClick():`** Closes the dialog without confirming the update action.

- **`onYesClick():`** Confirms the update action and closes the dialog, passing the selected option back to the calling component.

## Dependencies:

- **`MatDialogModule:`** Material module for dialogs.
- **`MatFormFieldModule:`** Material module for form fields.
- **`MatInputModule:`** Material module for input fields.
- **`MatSelectModule:`** Material module for select dropdowns.
- **`FormsModule:`** Angular module for two-way data binding.

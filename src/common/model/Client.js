class Client {
  // fname, lname, dob
  // address, telephone
  // medical questionnaire

  constructor() {
    this.firstName = null
    this.lastName = null
    this.email = null
    this.dateOfBirth = null // ISO 8601 syntax (YYYY-MM-DD)
    this.telephone = {
      countryCode: null,
      areaCode: null,
      phoneNumber: null
    }
    this.address = {
      streetNumber: null,
      streetName: null,
      appartmentNo: null,
      postalOrZipCode: null,
      city: null,
      provinceOrState: null,
      country: null
    }
  }


}

describe(`license`, function() {

  it(`has the correct year`, function() {

    cy.readFile(`LICENSE`)
    .then(license => {

      const yearRegExp      = /(?<licenseYear>\d{4})/u
      const { licenseYear } = yearRegExp.exec(license).groups
      const currentYear     = String(new Date().getFullYear())

      expect(licenseYear).to.eql(currentYear)

    })


  })

})

let founding_member_counter = 0
let program_counter = 0
let service_counter = 0
let financial_counter = 0
let expense_counter = 0
window.onload = moreFields

function moreFields(id, legend) {

    counter = eval(id + "_counter")
    let newFields = document.getElementById(id + counter).cloneNode(true)
    counter++
    newFields.id = id + counter
    
    for (element of newFields.elements) {
        element.value = ""
    }

    let newField = newFields.childNodes
    newField[1].textContent = legend + " " + (counter + 1)

    for (let i = 0; i < newField.length; i++) {
        let id = newField[i].id
        if (id)
            newField[i].id = id + counter
    }

    let insert = document.getElementById(id + (counter - 1))
    insert.parentNode.insertBefore(newFields, insert.nextSibling);
    eval(id + "_counter = counter")
}

window.onload = moreFields;

function getValues() {


    const organisation_summary = {
        org_name: document.getElementById("org_name").value,
        description: document.getElementById("description").value,
        country: document.getElementById("country").value,
        pincode: document.getElementById("pincode").value,
        address1: document.getElementById("address1").value,
        address2: document.getElementById("address2").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        upi_num: document.getElementById("upi_num").value,
        upi_id: document.getElementById("upi_id").value,
    }

    const funds = {
        mission: document.getElementById("mission").value,
        fund_request: document.getElementById("fund_request").value,
        fund_area: document.getElementById("fund_area").value,
        fund_purpose: document.getElementById("fund_purpose").value,
    }

    let founding_members = {}
    for (let i = 0; i <= founding_member_counter; i++) {
        n = i
        if (i == 0) { i = "" }
        founding_members[n] = { name: document.getElementById("member_name" + i).value, email: document.getElementById("member_email" + i).value, mobile: document.getElementById("member_mobile" + i).value, about: document.getElementById("member_about" + i).value }
    }

    let programs = {}
    for (let i = 0; i <= program_counter; i++) {
        n = i
        if (i == 0) { i = "" }
        programs[n] = { name: document.getElementById("program_name" + i).value, details: document.getElementById("program_details" + i).value, photo: document.getElementById("program_photo" + i).value, start: document.getElementById("program_start" + i).value, end: document.getElementById("program_end" + i).value, impacts: document.getElementById("program_impacts" + i).value }
    }

    let services = {}
    for (let i = 0; i <= service_counter; i++) {
        n = i
        if (i == 0) { i = "" }
        services[n] = { name: document.getElementById("service_name" + i).value, description: document.getElementById("service_description" + i).value, photo: document.getElementById("service_photo" + i).value, revenue: document.getElementById("service_revenue" + i).value, profit: document.getElementById("service_profit" + i).value, resources: document.getElementById("service_resources" + i).value }
    }

    let financials = {}
    for (let i = 0; i <= financial_counter; i++) {
        n = i
        if (i == 0) { i = "" }
        financials[n] = { funding: document.getElementById("funding" + i).value, donor: document.getElementById("donor" + i).value }
    }

    let expenses = {}
    for (let i = 0; i <= expense_counter; i++) {
        n = i
        if (i == 0) { i = "" }
        expenses[n] = {head: document.getElementById("expense_head" + i).value, amount: document.getElementById("expense_amount" + i).value }
    }

    const data = {organisation_summary, funds, founding_members, programs, services, financials, expenses}
    
    return data
}

function checkUndefined(variable) {
    if (variable == undefined) {return ""}
    return variable
}

function generatePDF() {

    let html = ""
    let client = new XMLHttpRequest()
    const template_link = "https://raw.githubusercontent.com/anshunderscore/pdf-generator/main/template.mustache" // would normally be ./template.mustache which doesn't work on github pages
    client.open('GET', template_link)
    client.onreadystatechange = function () {
        const data = getValues()
        
        let founding_members = ""
        let programs = ""
        let services = ""
        let financials = ""
        let expenses = ""

        for (let i = 0; i <= founding_member_counter; i++) {
            member = data.founding_members[i]
            html = 
            `<fieldset>
                <legend><strong>${checkUndefined(member.name)}</legend><br>
                Email: <strong>${checkUndefined(member.email)}<br><br>
                Mobile: <strong>${checkUndefined(member.mobile)}<br><br>
                About:<br><strong>${checkUndefined(member.about)}<br><br>
            </fieldset>`
            founding_members += html
        }
        for (let i = 0; i <= program_counter; i++) {
            program = data.programs[i]
            html = 
            `<fieldset>
                <legend><strong>${checkUndefined(program.name)}</strong></legend><br>
                Details:<br><strong>${checkUndefined(program.details)}</strong><br><br>
                Start: <strong>${checkUndefined(program.start)}</strong><br><br>
                End: <strong>${checkUndefined(program.end)}</strong><br><br>
                Impacts:<br><strong>${checkUndefined(program.impacts)}</strong><br><br>
            </fieldset>`;
            programs += html
        }
        for (let i = 0; i <= service_counter; i++) {
            service = data.services[i]
            html = 
            `<fieldset>
                <legend><strong>${checkUndefined(service.name)}</strong></legend><br>
                Email: <strong>${checkUndefined(service.description)}</strong><br><br>
                Revenue: <strong>${checkUndefined(service.revenue)}</strong><br><br>
                Profit <strong>${checkUndefined(service.profit)}</strong><br><br>
                Resources: <strong>${checkUndefined(service.resources)}</strong><br><br>
            </fieldset>`
            services += html
        }
        for (let i = 0; i <= financial_counter; i++) {
            donor = data.financials[i]
            html = 
            `<fieldset>
                <legend><strong>${checkUndefined(donor.donor)}</strong></legend><br>
                Funding: <strong>${checkUndefined(donor.funding)}</strong><br><br>
            </fieldset>`
            financials += html
        }
        for (let i = 0; i <= expense_counter; i++) {
            expense = data.expenses[i]
            html = 
            `<fieldset>
                <legend><strong>${checkUndefined(expense.head)}</strong></legend><br>
                Amount: <strong>${checkUndefined(expense.amount)}</strong><br><br>
            </fieldset>`
            expenses += html
        }

        const template = client.responseText
        const rendered = Mustache.render(template, {
            org_name: data.organisation_summary.org_name, description: data.organisation_summary.description, email: data.organisation_summary.email, mobile: data.organisation_summary.mobile,
            address1: data.organisation_summary.address1, address2: data.organisation_summary.address2, pincode: data.organisation_summary.pincode, country: data.organisation_summary.country,
            upi_id: data.organisation_summary.upi_id, upi_num: data.organisation_summary.upi_num,
            mission_statement: data.funds.mission, fund_request: data.funds.fund_request, fund_area: data.funds.fund_area, fund_purpose: data.funds.fund_purpose,
            founding_members: founding_members, programs: programs, services: services, donors: financials, expenses: expenses
            })
        html = he.decode(rendered)
        console.log(data)
        html2pdf(html, {
            margin: 10,
            filename: data.organisation_summary.org_name + ".pdf",
            enableLinks: true,
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        })
    }
    client.send()
}

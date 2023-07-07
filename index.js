// Option through commander
import { program } from "commander";

// Option through yargs
// import yargs from "yargs";

import contactsService from "./contacts.js";

// Option through yargs
// const { argv } = yargs(process.argv.slice(2));

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await contactsService.listContacts();
        return console.table(allContacts);
        break;

      case "get":
        const oneContact = await contactsService.getContactById(id);
        return console.table(oneContact);
        break;

      case "add":
        const newContact = await contactsService.addContact({
          name,
          email,
          phone,
        });
        return console.table(newContact);
        break;

      case "update":
        const updateContact = await contactsService.updateContactById(id, {
          name,
          email,
          phone,
        });

        return console.table(updateContact);
        break;

      case "remove":
        const deleteContact = await contactsService.removeContact(id);
        return console.table(deleteContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Option through commander
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);

// Option through yargs
// invokeAction(argv);

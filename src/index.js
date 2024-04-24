import Contacts from './contacts.js';
import { program } from 'commander';

program
.requiredOption('-a, --action <type>', 'Choose action')
.option('-i, --id <number>', 'User id')
.option('-n, --name <string>', 'User name')
.option('-e, --email <string>', 'User email')
.option('-p, --phone <string>', 'User phone');

program.parse();

const options = program.opts();

const invokeAction = async ({
  action,
  id,
  name,
  email,
  phone,
}) => {
  switch (action) {
    case 'list':
      return Contacts.listContacts();
    case 'get':
      return Contacts.getContactById(id);
    case 'add':
      return Contacts.addContact(name, email, phone);
    case 'update':
      return Contacts.updateContactById(id, name, email, phone);
    case 'remove':
      return Contacts.removeContact(id);
    default:
      console.error('Undefined action');
  }
};

(async () => {
  console.log(await invokeAction({
    action: options.action,
    id: options.id,
    name: options.name,
    email: options.email,
    phone: options.phone,
  }));
})();

import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import s from './ContactsPage.module.css';

const ContactsPage = () => {
  return (
    <div className={s.app_wrapper}>
      <div>
        <ContactForm />
        <SearchBox />
      </div>
      <ContactList />
    </div>
  );
};

export default ContactsPage;
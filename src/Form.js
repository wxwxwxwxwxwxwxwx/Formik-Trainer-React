import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({label, ...props}) => {
 
    const [field, meta] = useField(props);
    const {name} = props;

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )

};

const MyTextArea = ({label, ...props}) => {

    const [field, meta] = useField(props);
    const {name} = props;

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <textarea {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )

};

const MySelect = ({label, ...props}) => {

    const [field, meta] = useField(props);
    const {name} = props;

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <select {...props} {...field}>
                <option value="">Выберите валюту</option>
                <option value="USD">USD</option>
                <option value="UAH">UAH</option>
                <option value="RUB">RUB</option>
            </select>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )

};

const MyCheckbox = ({children, ...props}) => {

    const [field, meta] = useField({...props, type: 'checkbox'});

    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...props} {...field}/>
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )

};

const CustomForm = () => {

    return (
        <Formik
            initialValues = {{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema= {Yup.object({
                name: Yup.string()
                        .min(2, 'Минимум 2 символа')
                        .max(20, 'Максимум 20 символов')
                        .required('Обязательное поле'),
                email: Yup.string()
                        .email('Неправильный email')
                        .required('Обязательное поле'),
                amount: Yup.number()
                        .min(5, 'Не менее 5')
                        .required('Обязательное поле'),
                currency: Yup.string()
                        .required('Выберите валюту'),
                text: Yup.string()
                        .min(10, 'Не менее 10 символов'),
                terms: Yup.boolean()
                        .required('Необходимо согласие')
                        .oneOf([true], 'Необходимо согласие')
            })}
            onSubmit= {values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>

                <MyTextInput
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"
                />

                <MyTextInput
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"
                />

                <MyTextInput
                    label="Количество"
                    id="amount"
                    name="amount"
                    type="number"
                />

                <MySelect
                    label="Валюта"
                    id="currency"
                    name="currency"
                />

                <MyTextArea
                    label="Ваше сообщение"
                    id="text"
                    name="text"
                />

                <MyCheckbox
                    name="terms">
                        Соглашение с политикой конфиденциальности
                </MyCheckbox>

                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;
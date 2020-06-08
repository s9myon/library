import React, { useState, useContext, useEffect } from 'react';
import { AddBooks } from '../components/AddBooks';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import { useMessage } from '../hooks/message.hook';

export function AdminPage() {
    const { request, error, setError, clearError } = useHttp();
    const message = useMessage();
    const { token } = useContext(AuthContext);
    const [form, setForm] = useState({
        book: '',
        name: '',
        surname: '',
        middleName: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);


    function updateForm(field, value) {
        setForm({ ...form, [field]: value});
    }

    async function bookFormHandler() {
        try {
            const { book, name, surname, middleName } = form;
            if(book && name && surname) {
                const result = await request(
                    '/book/admin/addbook',
                    'POST',
                    { book, author: { name, surname, middleName }, token }
                );
                console.log(result);
            } else {
                setError('Заполните все поля');
            }
        } catch (e) {

        }
    }
    return (
        <div>
            <AddBooks
                bookFormHandler = {() => bookFormHandler()}
                updateForm = {(field, value) => updateForm(field, value)}
            />
        </div>
    );
}
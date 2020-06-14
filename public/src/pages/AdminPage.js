import React, { useState, useContext, useEffect } from 'react';
import { AddBooks } from '../components/AddBooks';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import { useMessage } from '../hooks/message.hook';
import { GivingBook } from '../components/GivingBook';

export function AdminPage() {
    const { request, error, setError, clearError } = useHttp();
    const message = useMessage();
    const { token } = useContext(AuthContext);
    const [form, setForm] = useState({
        book: '',
        name: '',
        surname: '',
        middleName: '',
        yearOfIssue: '',
        publishingHouse: '',
        email: '',
        bookId: ''
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
            const { book, name, surname, middleName, yearOfIssue, publishingHouse } = form;
            if(book && name && surname && middleName && yearOfIssue && publishingHouse) {
                await request(
                    '/book/admin/addbook',
                    'POST',
                    { book, author: { name, surname, middleName }, yearOfIssue, publishingHouse, token }
                );
            } else {
                setError('Заполните все поля');
            }
        } catch (e) {

        }
    }

    
    async function giveBookHandler(event) {
        try {
            const { email, bookId } = form;
            if(email && bookId) {
                await request(`/book/admin/updateinstance`, 'POST', {
                    user: { email: email },
                    instance: { id: bookId },
                    token
                });
            }
        } catch(e) {

        }
    }
    
    return (
        <div>
            <GivingBook
                giveBookHandler = {() => giveBookHandler()}
                updateForm = {(field, value) => updateForm(field, value)}
            />
            <AddBooks
                bookFormHandler = {() => bookFormHandler()}
                updateForm = {(field, value) => updateForm(field, value)}
            />
        </div>
    );
}
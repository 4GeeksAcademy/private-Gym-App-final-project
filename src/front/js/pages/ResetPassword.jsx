import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useForm, ValidationError } from '@formspree/react';


export const ResetPassword = () => {
    const [state, handleSubmit] = useForm("myyqrjdl");



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                />
                <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                />
                <textarea
                    id="message"
                    name="message"
                />
                <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                />
                <button type="submit" disabled={state.submitting}>
                    Submit
                </button>
            </form>
        </div>
    )
}
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
const axios = require('axios').default;
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, { useEffect, useState } from "react";


function EditHero({heros}) {

    const router = useRouter()
    const heroId = router.query.id

    const [form, setForm] = useState({
        superHero : heros.superHero,
        realName : heros.realName
    });

    const handleChange = (e) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
    }

    const handleForm = async(e) => {
        e.preventDefault();
        try {
            const res = await axios(`http://localhost:3000/api/hero/${heroId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(form)
            })
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='container'>
        <h1 className="display-3">Add a new hero identity</h1>
        <form onSubmit={handleForm}>
            <MDBInput
            onChange={handleChange}
            label='Super Hero'
            type="text"
            name='superHero'
            value={form.superHero}
            />
            <MDBInput
            className='my-2'
            onChange={handleChange}
            label='Real Name'
            type="text"
            name='realName'
            value={form.realName}
            />
            <MDBBtn type='Submit'>Edit a Hero</MDBBtn>
        </form>
    </div>
  )
}

export async function getServerSideProps({params}) {
    const id = params.id;
    const res = await axios(`http://localhost:3000/api/hero/${id}`)
    console.log(res.data.hero);
    const {hero} = res.data
    return {
      props: {heros: hero}
    }
}

export default EditHero
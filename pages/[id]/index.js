import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
const axios = require('axios').default;
import Link from 'next/link'
import {useRouter} from 'next/router'

function EachHero({heros}) {

  const router = useRouter()
  const heroId = router.query.id
  const deleteHero = async () => {
      try {
          const deleteHero = await axios(`http://localhost:3000/api/hero/${heroId}`,{
              method: "DELETE",
          })
          router.push('/')
      } catch (error) {
          console.log(error);
      }
  }  

  return (
    <div className='container'>
        <h1 className="display-3">Identity of hero</h1>
        <MDBCard className='border border-2 my-2' style={{ maxWidth: '22rem' }}>
            <MDBCardBody>
                <MDBCardTitle>{heros.superHero}</MDBCardTitle>
                    <MDBCardText>
                    {heros.realName}
                    </MDBCardText>
                <MDBBtn 
                className='btn btn-danger'
                onClick={deleteHero}
                >
                Delete Hero
                </MDBBtn>
            </MDBCardBody>
        </MDBCard>
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

export default EachHero
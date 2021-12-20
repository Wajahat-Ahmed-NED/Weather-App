import React, { useEffect, useState } from 'react'

export default function Temp() {

    const [degree, setDegree] = useState(0)
    const [city, setCity] = useState('Karachi')
    const [country, setCountry] = useState('PK')
    const [tempMax, setTempMax] = useState()
    const [tempMin, setTempMin] = useState()


    const data = async () => {

        // -------Using Promises---------

        if (city.length > 1) {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=70eefff73d1dfcf0e9ca4bfb45c3c9d2`
            fetch(url)
                .then((response) => response.json())
                .then(data1 => {
                    console.log(data1)
                    const tempk = data1.main.temp
                    let tempc = tempk - 273
                    tempc = tempc.toFixed(2)
                    setDegree(tempc)
                    setCountry(data1.sys.country)
                    setTempMax(data1.main.temp_max)
                    setTempMin(data1.main.temp_min)

                })
                .catch(err => console.log("Not Found " + err))


            //-----Using async await -------

            // const result2 = await result.json()
            // console.log(result2 ? result2 : "Not Found")
            // const tempk = result2.main.temp
            // let tempc = tempk - 273
            // tempc = tempc.toFixed(2)
            // console.log(tempc)
            // setDegree(tempc)


        }
        else {
            setDegree(0)
            setTempMax(273)
            setTempMin(273)
        }


    }

    useEffect(() => { 
        data()
    }, [city])


    return (
        <>
            <h1 className='my-4' style={{color:'white'}}>Weather App</h1>
            <div className="container my-5 p-5 shadow-lg" style={{border:'2px solid black',borderRadius:'20px',width:'500px',backgroundColor:'beige'}}>


                <div className="mb-3 ">
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="City Name" />
                </div>


                <h2 className='my-3' >{city.length !== 0 ? city : 'Not Found'}</h2>
                <h3 className='my-3' >Country : {city.length !== 0 ? country : 'N/A'}</h3>
                <h3 className='my-3'>{degree} Celsius</h3>
                <hr />
                <p className='my-3'>Max Temp : {(tempMax-273).toFixed(2)} Celsius | Min Temp : {(tempMin-273).toFixed(2)} Celsius</p>

            </div>
        </>
    )
}

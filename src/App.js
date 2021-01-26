import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import axios from "axios"

import imagen from "./cryptomonedas.png"
import Formulario from "./components/Formulario"
import Cotizacion from "./components/Cotizacion"
import Spiner from "./components/Spiner"

const Contenedor = styled.div`
	max-width: 900px;
	margin: 0 auto;
	@media (min-width: 992px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`
const Imagen = styled.img`
	max-width: 100%;
	margin-top: 5rem;
`
const Heading = styled.h1`
	font-family: "Bebas Neue", cursive;
	color: #fff;
	text-align: left;
	font-weight: 700;
	font-size: 50px;
	margin-bottom: 50px;
	margin-top: 80px;
	&::after {
		content: "";
		width: 100px;
		height: 6px;
		background-color: #66f2fe;
		display: block;
	}
`
function App() {
	const [moneda, guardarmoneda] = useState("")
	const [cryptoMoneda, guardarCryptoMoneda] = useState("")
	const [resultado, guardarResultado] = useState({})
	const [cargando, guardraCargando] = useState(false)
	useEffect(() => {
		const cotizarCryptoMoneda = async () => {
			if (moneda === "") return
			const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoMoneda}&tsyms=${moneda}`
			const resultado = await axios.get(url)
			guardraCargando(true)
			setTimeout(() => {
				guardraCargando(false)
				guardarResultado(
					resultado.data.DISPLAY[cryptoMoneda][moneda]
				)
			}, 2000)
		}
		cotizarCryptoMoneda()
	}, [moneda, cryptoMoneda])
	const Componente = cargando ? (
		<Spiner />
	) : (
		<Cotizacion resultado={resultado} />
	)
	return (
		<Contenedor>
			<div>
				<Imagen alt='Imagen Crypto' src={imagen} />
			</div>
			<div>
				<Heading>Cotiza CryptoMoneda al instante</Heading>
				<Formulario
					guardarmoneda={guardarmoneda}
					guardarCryptoMoneda={guardarCryptoMoneda}
				/>
				{Componente}
			</div>
		</Contenedor>
	)
}

export default App

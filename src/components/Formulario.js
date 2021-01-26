import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import useMoneda from "../hooks/useMoneda"
import useCrypto from "../hooks/useCrypto"
import axios from "axios"
import Error from "./Error"
const Button = styled.input`
	margin-top: 20px;
	font-weight: bold;
	font-size: 20px;
	padding: 10px;
	background-color: #66a2fe;
	border: none;
	width: 100%;
	border-radius: 10px;
	color: #fff;
	&:hover {
		background-color: #326ac0;
		cursor: pointer;
	}
	transition: background-color 0.3s ease;
`

export default function Formulario({guardarmoneda,guardarCryptoMoneda}) {
	const [listaCrypto, guardarListaCrypto] = useState([])
	const [error, guardarError] = useState(false)
	const MONEDAS = [
		{ codigo: "USD", nombre: "Dolar de Estados unidos" },
		{ codigo: "MXN", nombre: "Peso Mexinao" },
		{ codigo: "EUR", nombre: "Euro" },
		{ codigo: "GBP", nombre: "British pound" },
	]
	const [moneda, SelectMoneda] = useMoneda(
		"Elije Tu moneda",
		"",
		MONEDAS
	)
	const [crypto, SeletCrypto] = useCrypto(
		"Elije tu Crypto",
		"",
		listaCrypto
	)
	useEffect(() => {
		const consultarAPI = async () => {
			const url =
				"https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
			const resultado = await axios.get(url)
			guardarListaCrypto(resultado.data.Data)
		}
		consultarAPI()
	}, [])
	const cotizarMoneda = (e) => {
		e.preventDefault()
		if (moneda === "" || crypto === "") {
			guardarError(true)
			return
		}
		guardarError(false)
		guardarmoneda(moneda);
		guardarCryptoMoneda(crypto);
	}
	return (
		<form onSubmit={cotizarMoneda}>
			{error ? <Error mensaje='Todos los Campos son Obligatorios' /> : null}
			<SelectMoneda />
			<SeletCrypto />
			<Button type='submit' value='Calcular' />
		</form>
	)
}

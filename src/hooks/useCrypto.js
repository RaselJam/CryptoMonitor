import React, { Fragment, useState } from "react"
import styled from "@emotion/styled"

const Label = styled.label`
	font-family: "Bebas Neue", cursive;
	color: #fff;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 2.4rem;
	margin-top: 2rem;
	display: block;
`
const Select = styled.select`
	width: 100%;
	display: block;
	padding: 1rem;
	-webkit-appearance: none;
	border-radius: 10px;
  border: none;
  font-size : 1rem;
`
const useCrypto = (label, stateInicial, opciones) => {
  const [state, actulaizarState] = useState(stateInicial)
  
	const SeletCrypto = () => (
		<Fragment>
			<Label>{label}</Label>
			<Select
				onChange={(e) => actulaizarState(e.target.value)}
				value={state}>
				<option value=''>-- Seleccione --</option>
				{opciones.map((opcion) => (
					<option value={opcion.CoinInfo.Name} key={opcion.CoinInfo.Id}>
						{opcion.CoinInfo.FullName}
					</option>
				))}
			</Select>
		</Fragment>
	)
	return [state, SeletCrypto, actulaizarState]
}
export default useCrypto

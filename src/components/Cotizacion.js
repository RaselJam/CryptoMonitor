import React from "react"
import styled from "@emotion/styled"
const ResultadoDiv = styled.div`
	color: #fff;
`
const Info = styled.p`
	font-size: 18px;
`
const Precio = styled.p`
	font-size: 30px;
`
export default function Cotizacion({ resultado }) {
	if (Object.keys(resultado).length === 0) return null
	console.log(resultado)
	return (
		<ResultadoDiv>
			<Precio>
				EL precio es : <span>{resultado.PRICE}</span>
			</Precio>
			<Info>
				EL precio mas alto de Dia :{" "}
				<span>{resultado.HIGHDAY}</span>
			</Info>
			<Info>
				EL precio mas bajo de Dia :{" "}
				<span>{resultado.LOWDAY}</span>
			</Info>
			<Info>
				Ultima Actualizacion :{" "}
				<span>{resultado.LASTUPDATE}</span>
			</Info>
		</ResultadoDiv>
	)
}

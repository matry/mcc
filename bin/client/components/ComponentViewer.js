import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { spacing } from '../theme'
import Canvas from './Canvas'

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: max-content auto;
  overflow: hidden;
`

const StyledDiv = styled.div`
  padding: 0px ${spacing(1)}px;
`

const StyledHeader = styled.header`
  margin-top: ${spacing(1.5)}px;
`

const StyledSmall = styled.small`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #777777;
  text-transform: uppercase;
`

const StyledH2 = styled.h2`
  font-weight: 500;
  font-size: 20px;
  color: #333333;
`

const ComponentViewer = ({ name, renderer }) => {
  return (
    <StyledSection>
      <StyledDiv>
        <StyledHeader>
          <StyledSmall>Viewing</StyledSmall>
          <StyledH2>{name}</StyledH2>
        </StyledHeader>
      </StyledDiv>
      <Canvas
        renderer={renderer}
        gridOptions={{
          gridColor: '#ddd',
          gridPlacement: 'back',
          gridSpacing: 10,
          gridLineWidth: 0.5,
        }}
      />
    </StyledSection>
  )
}

export default ComponentViewer

import React from 'react'
import styled from '@emotion/styled'
import { spacing } from '../theme'
import BooleanField from './BooleanField'
import StringField from './StringField'
import ColorField from './ColorField'

const StyledForm = styled.form`
  margin-top: ${spacing(1.5)}px;

  table {
    font-family: sans-serif;
    font-weight: 300;
  }

  td {
    vertical-align: baseline;
    padding-left: 8px;
  }

  td > div {
    display: inline-block;
  }

  .name {
    font-weight: bold;
    padding-left: 0px;
  }

  .active {
    color: #007bff;
  }
`

const StyledH5 = styled.h5`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #777777;
  text-transform: uppercase;
  margin-bottom: ${spacing(0.5)}px;
`

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  grid-row-gap: 4px;
`

const generateField = ({ type, title, value }, onChange) => {
  let rendered = null
  const key = `field_${title}`

  switch (type) {
    case 'boolean':
      rendered = <BooleanField key={key} name={title} value={value} onChange={onChange} />
      break
    case 'string':
      rendered = <StringField key={key} name={title} value={value} onChange={onChange} />
      break
    case 'color':
      rendered = <ColorField key={key} name={title} value={value} onChange={onChange} />
      break
    default:
      break
  }

  return rendered
}

const InputForm = ({ options, onChange }) => {
  return (
    <StyledForm>
      <table>
        <tbody>
          <tr>
            <td class="name">Container</td>
          </tr>
          <tr>
            <td>width</td>
            <td class="active">
              <div tabindex="0" contentEditable>
                200px sdfhu dfihudfis fhudsi hufhudfhd
              </div>
            </td>
          </tr>
          <tr>
            <td>height</td>
            <td class="active">
              <div tabindex="0" contentEditable>
                100px
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <table>
                <tr>
                  <td class="name">Icon</td>
                </tr>
                <tr>
                  <td>width</td>
                  <td class="active">
                    <div tabindex="0" contentEditable>
                      200px
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>height</td>
                  <td class="active">
                    <div tabindex="0" contentEditable>
                      100px
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </StyledForm>
  )
}

export default InputForm

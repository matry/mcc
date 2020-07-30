import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ArrowLeft, ArrowRight, Filter1, Filter2, Filter4 } from '@material-ui/icons'
import { colors, spacing } from '../theme'

const Paginator = styled.div`
  border-bottom: 1px solid ${colors.grey[300]};
  padding: ${spacing(1.5)};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const PaginationButton = styled.button`
  margin: 0px 12px;
  background: none;
  border: 1px solid ${colors.grey[400]};
  cursor: pointer;

  &:focus {
    outline: 0;
    border-color: ${colors.blue[400]};
  }
`

const PerPage = styled.div`
  position: absolute;
  top: 0px;
  right: ${spacing(3)};
  bottom: 0px;
  display: flex;
  align-items: center;
`

const PerPageButton = styled.button`
  background: none;
  border: none;
  margin: 0px 5px;
  cursor: pointer;
  color: ${(props) => (props.active ? colors.cyan[500] : colors.grey[500])};

  &:focus {
    outline: 0;
  }
`

const RenderOne = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RenderTwo = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const RenderFour = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`

const Indexer = ({ indices }) => {
  const count = indices.length
  const [perPage, setPerPage] = useState(1)
  const [page, setPage] = useState(0)
  const actualPerPage = count < 3 ? count : perPage

  let IndexContainer = null
  switch (actualPerPage) {
    case 1:
      IndexContainer = RenderOne
      break
    case 2:
      IndexContainer = RenderTwo
      break
    case 4:
      IndexContainer = RenderFour
      break
    default:
      break
  }

  const startIndex = page * actualPerPage
  const endIndex = startIndex + actualPerPage
  const actualIndices = indices.slice(startIndex, endIndex)

  let pageCount = count / actualPerPage

  if (count % actualPerPage) {
    pageCount++
  }

  return (
    <div>
      <Paginator>
        <PaginationButton onClick={() => setPage(Math.max(page - 1, 0))}>
          <ArrowLeft />
        </PaginationButton>
        {`${page + 1} of ${pageCount}`}
        <PaginationButton onClick={() => setPage(Math.min(page + 1, pageCount - 1))}>
          <ArrowRight />
        </PaginationButton>

        <PerPage>
          <PerPageButton active={perPage === 1}>
            <Filter1
              color="inherit"
              onClick={() => {
                setPage(0)
                setPerPage(1)
              }}
            />
          </PerPageButton>
          <PerPageButton active={perPage === 2}>
            <Filter2
              color="inherit"
              onClick={() => {
                setPage(0)
                setPerPage(2)
              }}
            />
          </PerPageButton>
          <PerPageButton active={perPage === 4}>
            <Filter4
              color="inherit"
              onClick={() => {
                setPage(0)
                setPerPage(4)
              }}
            />
          </PerPageButton>
        </PerPage>
      </Paginator>

      <IndexContainer>{actualIndices.map((indexRender) => indexRender())}</IndexContainer>
    </div>
  )
}

export default Indexer

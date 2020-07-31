import React from 'react'
import styled from '@emotion/styled'
import { spacing, colors } from '../theme'

const StoryList = styled.ul`
  padding: ${spacing(2)}px 0px;
  list-style: none;
  border-right: 1px solid ${colors.grey[300]};
  overflow-x: hidden;
  min-width: 160px;
`

const StoryItem = styled.li`
  padding: 7px 0px 7px 0px;
  color: ${colors.grey[900]};
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
`

const FrameList = styled.ul`
  list-style: none;
  padding: ${spacing(1)}px 0px;
`

const FrameItem = styled.li`
  padding: 7px ${spacing(4)}px 7px 0px;
  background: ${(props) => (props.active ? colors.grey[300] : 'transparent')};
  color: ${(props) => (props.active ? colors.lightBlue[900] : colors.grey[700])};
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
  cursor: pointer;
`

const Span = styled.span`
  padding-left: ${(props) => spacing(props.indent)};
`

const StoryMenu = ({ activeFrameId, stories, onSelect }) => {
  return (
    <StoryList>
      {stories.map((story) => (
        <StoryItem key={story.id}>
          <Span indent={1.5}>{story.name}</Span>

          <FrameList>
            {story.frames.map((frame) => (
              <FrameItem
                active={frame.id === activeFrameId}
                key={`${story.id}-${frame.id}`}
                onClick={() => onSelect(frame.id)}
              >
                <Span indent={3}>{frame.name}</Span>
              </FrameItem>
            ))}
          </FrameList>
        </StoryItem>
      ))}
    </StoryList>
  )
}

export default StoryMenu

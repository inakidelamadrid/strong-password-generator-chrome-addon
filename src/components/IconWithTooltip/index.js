import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Overlay from 'react-bootstrap/Overlay'

const IconWithTooltip = ({ icon, tooltip }) => {
  const ref = useRef(null)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const showTooltip = () => setIsTooltipVisible(true)
  const hideTooltip = () => setIsTooltipVisible(false)

  const tooltipData = {
    text: 'Tooltip',
    ...tooltip,
  }
  return (
    <>
      <span ref={ref} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
        <FontAwesomeIcon
          icon={icon.name}
          color="#197bff"
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        />
      </span>
      <Overlay target={ref.current} show={isTooltipVisible} placement="right">
        {({
          placement,
          scheduleUpdate,
          arrowProps,
          outOfBoundaries,
          show: _show,
          ...props
        }) => (
          <div
            {...props}
            style={{
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            {tooltipData.text}
          </div>
        )}
      </Overlay>
    </>
  )
}
export default IconWithTooltip

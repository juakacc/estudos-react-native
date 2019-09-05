import React, { Component } from 'react'
import { View, StyleSheet, PanResponder, Dimensions, Alert } from 'react-native'
import Svg, {G, Rect} from 'react-native-svg'

function calcDistance(x1, y1, x2, y2) {
  const dx = x1 - x2
  const dy = y1 - y2
  return Math.sqrt(dx * dx + dy * dy)
}

function middle(p1, p2) {
  return (p1 + p2) / 2
}

function calcCenter(x1, y1, x2, y2) {
  return {
    x: middle(x1, x2),
    y: middle(y1, y2),
  }
}

class ZoomableSvg extends Component {
  state = {
    zoom: 1,
    left: 0,
    top: 0,
  }

  constructor(props) {
    super(props)
    this._panResponder = PanResponder.create({
      onPanResponderGrant: () => {},
      onPanResponderTerminate: () => {},
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onShouldBlockNativeResponder: () => true,
      onPanResponderTerminationRequest: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: evt => {
        const touches = evt.nativeEvent.touches;
        const length = touches.length; // Número de dedos utilizados 
        if (length === 1) { // Apenas moveu
          const [{ locationX, locationY }] = touches;
          // Alert.alert('Posições', `X: ${locationX} Y: ${locationY}`)
          this.processTouch(locationX, locationY);

        } else if (length === 2) { // Zoom
          const [touch1, touch2] = touches;
          this.processPinch(
            touch1.locationX,
            touch1.locationY,
            touch2.locationX,
            touch2.locationY
          )
        }
      },
      // parou o zoom e parou de mover
      onPanResponderRelease: () => {
        this.setState({
          isZooming: false,
          isMoving: false,
        })
      },
    })
  }

  processPinch(x1, y1, x2, y2) {
    const distance = calcDistance(x1, y1, x2, y2)
    const { x, y } = calcCenter(x1, y1, x2, y2)

    if (!this.state.isZooming) {
      const { top, left, zoom } = this.state
      this.setState({
        isZooming: true,
        initialX: x,
        initialY: y,
        initialTop: top,
        initialLeft: left,
        initialZoom: zoom,
        initialDistance: distance,
      })
    } else {
      const {
        initialX,
        initialY,
        initialTop,
        initialLeft,
        initialZoom,
        initialDistance,
      } = this.state

      const touchZoom = distance / initialDistance
      const dx = x - initialX
      const dy = y - initialY

      const left = (initialLeft + dx - x) * touchZoom + x
      const top = (initialTop + dy - y) * touchZoom + y
      const zoom = initialZoom * touchZoom

      this.setState({
        zoom,
        left,
        top,
      })
    }
  }

  processTouch(x, y) {
    if (!this.state.isMoving || this.state.isZooming) {
      const { top, left } = this.state
      this.setState({
        isMoving: true,
        isZooming: false,
        initialLeft: left,
        initialTop: top,
        initialX: x,
        initialY: y,
      })
    } else {
      const { initialX, initialY, initialLeft, initialTop } = this.state
      const dx = x - initialX
      const dy = y - initialY
      this.setState({
        left: initialLeft + dx,
        top: initialTop + dy,
      })
    }
  }

  render() {
    const viewBoxSize = 65
    const { height, width } = this.props
    const { left, top, zoom } = this.state
    const resolution = viewBoxSize / Math.min(height, width)
    return (
      <View {...this._panResponder.panHandlers}>
        <Svg
          width={width}
          height={height}
          viewBox="0 0 65 65"
          preserveAspectRatio="xMinYMin meet">
          <G
            transform={{
              translateX: left * resolution,
              translateY: top * resolution,
              scale: zoom,
            }}>
            <Rect x={0} y={0} height={60} width={60} fill='#fff' />
            <Rect x={5} y={5} height={50} width={50} />
          </G>
        </Svg>
      </View>
    )
  }
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ZoomableSvg width={width} height={height} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
})

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  Alert,
  TouchableOpacity
} from 'react-native'
import Svg, { G, Rect, Mask, Defs } from 'react-native-svg'
import Icon from 'react-native-vector-icons/FontAwesome'

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

export class ZoomableSvg extends Component {
  state = {
    zoom: 1,
    left: 0,
    top: 0,

    testeTop: 0, // remover depois
    testeLeft: 0,// remover depois

    right: 0,
    bottom: 0,

    viewBoxSize: 100,
    resolution: 0,
    fatorX: 0,
    fatorY: 0
  }

  constructor(props) {
    super(props)
    this._panResponder = PanResponder.create({
      onPanResponderGrant: () => { },
      onPanResponderTerminate: () => { },
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onShouldBlockNativeResponder: () => true,
      onPanResponderTerminationRequest: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: evt => {
        const touches = evt.nativeEvent.touches
        const length = touches.length

        if (length === 1) { // Apenas moveu
          const [{ locationX, locationY }] = touches
          this.setState({
            testeTop: Math.round(locationY),
            testeLeft: Math.round(locationX)
          })
          this.processTouch(locationX, locationY)

        } else if (length === 2) { // Zoom
          const [touch1, touch2] = touches
          this.processPinch(
            touch1.locationX,
            touch1.locationY,
            touch2.locationX,
            touch2.locationY
          )
        }
      },
      onPanResponderRelease: () => {
        this.setState({
          isZooming: false,
          isMoving: false,
        })
      },
    })
  }

  componentDidMount = () => {
    const resolution = this.state.viewBoxSize / Math.min(this.props.height, this.props.width)
    const fatorX = (this.props.x / resolution) / this.props.x
    const fatorY = (this.props.y / resolution) / this.props.y
    this.setState({resolution, fatorX, fatorY})
  }

  // toque 1 (x1, y1) toque 2 (x2, y2)
  processPinch(x1, y1, x2, y2) {
    const distance = calcDistance(x1, y1, x2, y2)
    const { x, y } = calcCenter(x1, y1, x2, y2)

    if (!this.state.isZooming) { // tocou a primeira vez
      const { top, left, zoom } = this.state
      this.setState({
        isZooming: true,
        initialX: x, // ponto medio inicial x
        initialY: y, // ponto medio inicial y
        initialTop: top, // posicao inicial topo
        initialLeft: left, // posicao inicial esquerda
        initialZoom: zoom, // zom inicial
        initialDistance: distance, // distancia inicial entre os dois dedos
      })
    } else {
      const {
        initialX,
        initialY,
        initialTop,
        initialLeft,
        initialZoom,
        initialDistance,
        fatorX,
        fatorY
      } = this.state

      const touchZoom = distance / initialDistance
      const deslocamentoX = x - initialX
      const deslocamentoY = y - initialY

      const left = (initialLeft + deslocamentoX - x) * touchZoom + x
      const top = (initialTop + deslocamentoY - y) * touchZoom + y
      const zoom = initialZoom * touchZoom

      const right = left + (this.props.x * fatorX * zoom)
      const bottom = top + (this.props.y * fatorY * zoom)

      this.setState({ zoom, left, top, right, bottom })
    }
  }

  processTouch(x, y) {
    if (!this.state.isMoving || this.state.isZooming) {
      const { top, left } = this.state
      this.setState({
        isMoving: true, // tá movendo agora
        isZooming: false, // sem zoom

        initialLeft: left, // Inicial esquerdo
        initialTop: top, // inicial topo

        initialX: x, // inicial do toque x
        initialY: y, // inicial do toque y
      })
    } else {
      const { initialX, initialY, initialLeft, initialTop, fatorX, fatorY, zoom } = this.state
      const dx = x - initialX
      const dy = y - initialY
      
      const left = initialLeft + dx
      const top = initialTop + dy
      const right = left + (this.props.x * fatorX * zoom)
      const bottom = top + (this.props.y * fatorY * zoom)

      this.setState({ left, top, right, bottom})
    }
  }

  enviar = () => {
    const coordenadas = {
      left: Math.round(this.state.left),
      top: Math.round(this.state.top),
      right: Math.round(this.state.right),
      bottom: Math.round(this.state.bottom),
      zoom: this.state.zoom,
      mouseX: Math.round(this.state.testeLeft),
      mouseY: Math.round(this.state.testeTop),
    }
    Alert.alert('Coordenadas', JSON.stringify(coordenadas))
  }

  render() {
    const { height, width } = this.props
    const { left, top, zoom, resolution } = this.state
    const resolutiony = this.state.viewBoxSize / this.props.height
    
    return (
      <View>
        <View {...this._panResponder.panHandlers}>
          <Svg
            width={width}
            height={height}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMinYMin meet">
              <Defs>
                    <Mask id="mask">
                    <G
                      transform={{
                        translateX: left * resolution,
                        translateY: top * resolutiony,
                        scale: zoom,
                      }}>
                      <Rect x={0} y={0} height={this.props.y} width={this.props.x} fill='#fff' />
                      <Rect x={1} y={1} height={this.props.y-2} width={this.props.x-2}/>
                    </G>
                    </Mask>
                </Defs>
                <Rect
                    height={height}
                    width={width}
                    fill='#fff'
                    mask="url(#mask)" />

            {/* <G
              transform={{
                translateX: left * resolution,
                translateY: top * resolution,
                scale: zoom,
              }}>
              <Rect x={0} y={0} height={this.props.y} width={this.props.x} fill='#fff' />
              <Rect x={1} y={1} height={this.props.y-2} width={this.props.x-2}/>
            </G> */}
          </Svg>
        </View>
        {/* <View style={styles.cameraElements}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={this.enviar} style={styles.buttom}>
              <Icon name="camera" size={30} color='#fff' />
            </TouchableOpacity>
          </View>
        </View> */}
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
        <ZoomableSvg width={width} height={height} x={30} y={30}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
  cameraElements: {
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    marginBottom: 5
  },
  buttom: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#000'
  },
})

import React, { Component } from 'react';
import './styles/ImageView.css';
import image from './image.jpg';

class ImageView extends Component {

  render() {
    return (
      <div className="big-container" id="big-container">
        <ImageBox
          width={1100} height={450} padding={50}
        />
      </div>
    )
  }
}

export class ImageBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leftBox: '0px', topBox: '0px', marginLeftImage: '0px', marginTopImage: '0px',
      opacityBox: 0, opacityZoomImage: 0,
      zoomWidth: (this.props.width - this.props.padding * 2) / 2 / 2.5,
      zoomHeight: (this.props.height - this.props.padding * 2) / 2.5,
      visibility: 'hidden',
    }

    this.zoom = this.zoom.bind(this);
  }

  zoom(event) {
    let container = document.getElementById('big-container');
    let mainImageLeft = (container.clientWidth - (this.props.width - this.props.padding * 2)) / 2;
    let mainImageTop = container.clientHeight - this.props.height + this.props.padding;
    let boxLeft = mainImageLeft;
    let boxTop = mainImageTop;

    if (
      event.clientX >= mainImageLeft + this.state.zoomWidth / 2 &&
      event.clientX <= mainImageLeft + (this.props.width - this.props.padding * 2) / 2 - this.state.zoomWidth / 2
    ) {
      boxLeft = event.clientX - this.state.zoomWidth / 2;
      let left = boxLeft.toString() + 'px';

      let marginLeft = '-' + ((boxLeft - mainImageLeft) * 2.5).toString() + 'px';

      this.setState({
        leftBox: left, opacityBox: 0.5, marginLeftImage: marginLeft, visibility: 'visible', opacityZoomImage: 1,
      });
    } else if (
      event.clientX >= mainImageLeft &&
      event.clientX <= mainImageLeft + (this.props.width - this.props.padding * 2) / 2
    ) {
      if (event.clientX < mainImageLeft + this.state.zoomWidth / 2) {
        boxLeft = mainImageLeft;
      } else if (event.clientX > mainImageLeft + (this.props.width - this.props.padding * 2) / 2 - this.state.zoomWidth / 2) {
        boxLeft = mainImageLeft + (this.props.width - this.props.padding * 2) / 2 - this.state.zoomWidth;
      }
      let left = boxLeft.toString() + 'px';

      let marginLeft = '-' + ((boxLeft - mainImageLeft) * 2.5).toString() + 'px';

      this.setState({
        leftBox: left, opacityBox: 0.5, mainImageLeft: marginLeft, visibility: 'visible', opacityZoomImage: 1,
      });
    }

    if (
      event.clientY >= mainImageTop + this.state.zoomHeight / 2 &&
      event.clientY <= mainImageTop + (this.props.height - this.props.padding * 2) - this.state.zoomHeight / 2
    ) {
      boxTop = event.clientY - this.state.zoomHeight / 2;
      let top = boxTop.toString() + 'px';

      let marginTop = '-' + ((boxTop - mainImageTop) * 2.5).toString() + 'px';

      this.setState({
        topBox: top, opacityBox: 0.5, marginTopImage: marginTop, visibility: 'visible', opacityZoomImage: 1,
      });
    } else if (
      event.clientY >= mainImageTop && event.clientY <= mainImageLeft + (this.props.height - this.props.padding * 2)
    ) {
      if (event.clientY < mainImageTop + this.state.zoomHeight / 2) {
        boxTop = mainImageTop;
      } else if (event.clientY > mainImageTop + (this.props.height - this.props.padding * 2) - this.state.zoomHeight / 2) {
        boxTop = mainImageTop + (this.props.height - this.props.padding * 2) - this.state.zoomHeight;
      }
      let top = boxTop.toString() + 'px';

      let marginTop = '-' + ((boxTop - mainImageTop) * 2.5).toString() + 'px';

      this.setState({
        topBox: top, opacityBox: 0.5, marginTopImage: marginTop, visibility: 'visible', opacityZoomImage: 1,
      });
    }

    if (
      event.clientX < mainImageLeft ||
      event.clientX > mainImageLeft + (this.props.width - this.props.padding * 2) / 2 ||
      event.clientY < mainImageTop ||
      event.clientY > mainImageTop + (this.props.height - this.props.padding * 2)
    ) {
      this.setState({
        opacityBox: 0, marginLeftImage: '0px', marginTopImage: '0px', visibility: 'hidden', opacityZoomImage: 0,
      })
    }
  }

  render() {
    return (
      <div
        style={{
          width: this.props.width - this.props.padding * 2,
          height: this.props.height - this.props.padding * 2,
          padding: this.props.padding,
        }}
        className="image-box"
        onMouseMove={this.zoom}
      >
        <MainImage
          width={(this.props.width - this.props.padding * 2) / 2}
          height={this.props.height - this.props.padding * 2}
        />
        <ZoomBox
          width={this.state.zoomWidth}
          height={this.state.zoomHeight}
          style={{ top: this.state.topBox, left: this.state.leftBox, opacity: this.state.opacityBox }}
        />
        <ZoomImage
          width={(this.props.width - this.props.padding * 2) / 2}
          height={this.props.height - this.props.padding * 2}
          style={{
            marginLeft: this.state.marginLeftImage, marginTop: this.state.marginTopImage,
            visibility: this.state.visibility, opacity: this.state.opacityZoomImage,
          }}
        />
      </div>
    )
  }
}


var MainImage = (props) => {
  return (
    <div style={{ width: props.width, height: props.height }} className='main-image' >
      <img src={image} style={{ width: props.width, height: props.height }} />
    </div>
  )
}

var ZoomBox = (props) => {
  return (
    <div
      className="zoom-box"
      style={{
        background: '#ffffff', width: props.width, height: props.height,
        top: props.style.top, left: props.style.left,
        opacity: props.style.opacity
      }}
    ></div>
  )
}

var ZoomImage = (props) => {
  return (
    <div
      style={{
        width: props.width, height: props.height, overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        className='content'
        style={{
          width: props.width, height: props.height, zIndex: -1,
        }}
      >
        <h2>Content</h2>
      </div>
      <div
        style={{
          width: props.width, height: props.height, opacity: props.style.opacity,
          visibility: props.style.visibility, transition: '0.5s',
        }}
        className="zoom-container" >
        <img src={image} style={{
          width: props.width * 2.5, height: props.height * 2.5,
          marginLeft: props.style.marginLeft, marginTop: props.style.marginTop,
        }} />
      </div>
    </div>
  )
}

export default ImageView;
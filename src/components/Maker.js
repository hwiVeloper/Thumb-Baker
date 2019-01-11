import React, { Component } from 'react';
import './Maker.css';

class Maker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewTextPosition: '',
      previewTextColor: '',
      previewWidth: 500,
      previewHeight: 500,
    }
  }

  render() {
    const {
      previewTextPosition,
      previewTextColor,
      previewWidth,
      previewHeight,
    } = this.state;

    return (
      <t>
        <div className="config-area">
          {/* 설정 */}
        </div>
        <div className="preview-area" width={previewWidth} height={previewHeight}>
          <div className={previewTextPosition}>Text Sample</div>
        </div>
        <div className="export-area">
          {/* 추출 */}
        </div>
      </t>
    )
  }
}

export default Maker;

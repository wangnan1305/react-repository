import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Modal, message, Row, Col } from 'antd';
import { isLocalStorageNameSupported, loadScript } from '../utils';
import ColorPicker from '../Color/ColorPicker';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.lessLoaded = false;

    this.state = {
      color: '#1890ff',
    };
  }

  componentDidMount() {}

  render() {
    return (
      <footer id="footer">
        <Row className="bottom-bar">
          <Col md={4} sm={24} />
          <Col md={20} sm={24}>
            <span style={{ marginRight: 12 }}>Copyright © <FormattedMessage id="app.footer.company" /></span>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default injectIntl(Footer);

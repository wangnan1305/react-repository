/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';
import classNames from 'classnames';
import LZString from 'lz-string';
import { Icon, Tooltip } from 'antd';
import EditButton from './EditButton';
import BrowserFrame from '../BrowserFrame';

function compress(string) {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

export default class Demo extends React.Component {
  static contextTypes = {
    intl: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      codeExpand: false,
      sourceCode: '',
      copied: false,
      copyTooltipVisible: false,
      showRiddleButton: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { highlightedCode } = nextProps;
    const div = document.createElement('div');
    div.innerHTML = highlightedCode[1].highlighted;
    this.setState({ sourceCode: div.textContent });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.codeExpand || this.props.expand) !== (nextState.codeExpand || nextProps.expand)
      || this.state.copied !== nextState.copied
      || this.state.copyTooltipVisible !== nextState.copyTooltipVisible;
  }

  componentDidMount() {
    const { meta, location } = this.props;
    if (meta.id === location.hash.slice(1)) {
      this.anchor.click();
    }
    this.componentWillReceiveProps(this.props);
  }

  handleCodeExpand = () => {
    this.setState({ codeExpand: !this.state.codeExpand });
  }

  saveAnchor = (anchor) => {
    this.anchor = anchor;
  }

  handleCodeCopied = () => {
    this.setState({ copied: true });
  }

  onCopyTooltipVisibleChange = (visible) => {
    if (visible) {
      this.setState({
        copyTooltipVisible: visible,
        copied: false,
      });
      return;
    }
    this.setState({
      copyTooltipVisible: visible,
    });
  }

  render() {
    const { state } = this;
    const { props } = this;
    const {
      meta,
      src,
      content,
      preview,
      highlightedCode,
      style,
      highlightedStyle,
      expand,
    } = props;
    if (!this.liveDemo) {
      this.liveDemo = meta.iframe
        ? <BrowserFrame><iframe src={src} height={meta.iframe} title="demo" /></BrowserFrame>
        : preview(React, ReactDOM);
    }
    const codeExpand = state.codeExpand || expand;
    const codeBoxClass = classNames({
      'code-box': true,
      expand: codeExpand,
    });

    const { locale } = this.context.intl;
    const localizedTitle = meta.title[locale] || meta.title;
    const localizeIntro = content[locale] || content;
    const introChildren = props.utils
      .toReactComponent(['div'].concat(localizeIntro));

    const highlightClass = classNames({
      'highlight-wrapper': true,
      'highlight-wrapper-expand': codeExpand,
    });

    const prefillStyle = `@import 'antd/dist/antd.css';\n\n${style || ''}`.replace(new RegExp(`#${meta.id}\\s*`, 'g'), '');
    const html = `<div id="container" style="padding: 24px"></div>
<script>
  var mountNode = document.getElementById('container');
</script>`;

    const dependencies = state.sourceCode.split('\n').reduce((acc, line) => {
      const matches = line.match(/import .+? from '(.+)';$/);
      if (matches && matches[1]) {
        acc[matches[1]] = 'latest';
      }
      return acc;
    }, { react: 'latest', 'react-dom': 'latest' });
    return (
      <section className={codeBoxClass} id={meta.id}>
        <section className="code-box-demo">
          {this.liveDemo}
          {
            style ?
              <style dangerouslySetInnerHTML={{ __html: style }} /> :
              null
          }
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <a href={`#${meta.id}`} ref={this.saveAnchor}>
              {localizedTitle}
            </a>
            <EditButton title={<FormattedMessage id="app.content.edit-page" />} filename={meta.filename} />
          </div>
          {introChildren}
          <Tooltip title={codeExpand ? 'Hide Code' : 'Show Code'}>
            <span className="code-expand-icon">
              <img
                alt="expand code"
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMTAyNHB4IiBoZWlnaHQ9IjEwMjRweCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5jb2RlPC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9IuWwj+ermSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iMC43Nzk3MzQxNDIiPiAgICAgICAgPGcgaWQ9ImNvZGUiIGZpbGw9IiMwMDAwMDAiPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMDE4LjY0NDk1LDUzMS4yOTc2MzcgQzEwMjcuMjc5NTIsNTEyLjY4NzQwMSAxMDIzLjI0NjE4LDQ4OS44Nzg3OSAxMDA3LjIwMzI4LDQ3NS40MzM2OTQgTDgwMi4wOTUzMDQsMjkwLjc1MzY0NyBMODAyLjA5NTMwNCwyOTAuNzUzNjQ3IEM3ODIuMzk0NzgyLDI3My4wMTUyMTcgNzUyLjA0NDUxNCwyNzQuNjA1ODA3IDczNC4zMDYwODMsMjk0LjMwNjMyOSBMNzM0LjMwNjA4MywyOTQuMzA2MzI5IEw3MzQuMzA2MDgzLDI5NC4zMDYzMjkgQzcxNi41Njc2NTMsMzE0LjAwNjg1MiA3MTguMTU4MjQzLDM0NC4zNTcxMiA3MzcuODU4NzY2LDM2Mi4wOTU1NSBMOTA0LjEzODQxNyw1MTEuODE0NDIgTDczNi44NTg3NjYsNjYyLjQzMzY5NCBDNzE3LjE1ODI0Myw2ODAuMTcyMTI1IDcxNS41Njc2NTMsNzEwLjUyMjM5MiA3MzMuMzA2MDgzLDczMC4yMjI5MTUgQzc1MS4wNDQ1MTQsNzQ5LjkyMzQzOCA3ODEuMzk0NzgyLDc1MS41MTQwMjggODAxLjA5NTMwNCw3MzMuNzc1NTk4IEwxMDA2LjIwMzI4LDU0OS4wOTU1NSBDMTAxMS44NDU1Miw1NDQuMDE1MjUxIDEwMTYuMDAyMjksNTM3LjkwMDQ2IDEwMTguNjQ0OTUsNTMxLjI5NzY0MyBaIE0xMTkuOTQ3LDUxMS4zOTAyMzEgTDI4Ni4yMjY2NSwzNjEuNjcxMzYxIEMzMDUuOTI3MTczLDM0My45MzI5MzEgMzA3LjUxNzc2MywzMTMuNTgyNjYzIDI4OS43NzkzMzMsMjkzLjg4MjE0IEwyODkuNzc5MzMzLDI5My44ODIxNCBMMjg5Ljc3OTMzMywyOTMuODgyMTQgQzI3Mi4wNDA5MDMsMjc0LjE4MTYxOCAyNDEuNjkwNjM1LDI3Mi41OTEwMjcgMjIxLjk5MDExMiwyOTAuMzI5NDU4IEwyMjEuOTkwMTEyLDI5MC4zMjk0NTggTDE2Ljg4MjE0MDIsNDc1LjAwOTUwNSBDMC44MzkyMzYyMDIsNDg5LjQ1NDYwMSAtMy4xOTQxMDE5OCw1MTIuMjYzMjEyIDUuNDQwNDY2NDUsNTMwLjg3MzQ0OCBDOC4wODMxMjU3OSw1MzcuNDc2MjcxIDEyLjIzOTg5NTksNTQzLjU5MTA2MSAxNy44ODIxNDAyLDU0OC42NzEzNjEgTDIyMi45OTAxMTIsNzMzLjM1MTQwOCBDMjQyLjY5MDYzNSw3NTEuMDg5ODM5IDI3My4wNDA5MDMsNzQ5LjQ5OTI0OCAyOTAuNzc5MzMzLDcyOS43OTg3MjYgQzMwOC41MTc3NjMsNzEwLjA5ODIwMyAzMDYuOTI3MTczLDY3OS43NDc5MzUgMjg3LjIyNjY1LDY2Mi4wMDk1MDUgTDExOS45NDcsNTExLjM5MDIzMSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiPjwvcGF0aD4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg=="
                className={codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
                onClick={this.handleCodeExpand}
              />
              <img
                alt="expand code"
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMTAyNHB4IiBoZWlnaHQ9IjEwMjRweCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5jb2RlLW9wZW48L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+PC9kZWZzPiAgICA8ZyBpZD0i5bCP56uZIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjc3OTczNDE0MiI+ICAgICAgICA8ZyBpZD0iY29kZS1vcGVuIiBmaWxsPSIjMDAwMDAwIj4gICAgICAgICAgICA8cGF0aCBkPSJNMTAxOC42NDQ5NSw1MzEuMjk3NjM3IEMxMDI3LjI3OTUyLDUxMi42ODc0MDEgMTAyMy4yNDYxOCw0ODkuODc4NzkgMTAwNy4yMDMyOCw0NzUuNDMzNjk0IEw4MDIuMDk1MzA0LDI5MC43NTM2NDcgQzc4Mi4zOTQ3ODIsMjczLjAxNTIxNyA3NTIuMDQ0NTE0LDI3NC42MDU4MDcgNzM0LjMwNjA4MywyOTQuMzA2MzI5IEM3MTYuNTY3NjUzLDMxNC4wMDY4NTIgNzE4LjE1ODI0MywzNDQuMzU3MTIgNzM3Ljg1ODc2NiwzNjIuMDk1NTUgTDkwNC4xMzg0MTcsNTExLjgxNDQyIEw3MzYuODU4NzY2LDY2Mi40MzM2OTQgQzcxNy4xNTgyNDMsNjgwLjE3MjEyNSA3MTUuNTY3NjUzLDcxMC41MjIzOTIgNzMzLjMwNjA4Myw3MzAuMjIyOTE1IEM3NTEuMDQ0NTE0LDc0OS45MjM0MzggNzgxLjM5NDc4Miw3NTEuNTE0MDI4IDgwMS4wOTUzMDQsNzMzLjc3NTU5OCBMMTAwNi4yMDMyOCw1NDkuMDk1NTUgQzEwMTEuODQ1NTIsNTQ0LjAxNTI1MSAxMDE2LjAwMjI5LDUzNy45MDA0NiAxMDE4LjY0NDk1LDUzMS4yOTc2NDMgWiBNMTE5Ljk0Nyw1MTEuMzkwMjMxIEwyODYuMjI2NjUsMzYxLjY3MTM2MSBDMzA1LjkyNzE3MywzNDMuOTMyOTMxIDMwNy41MTc3NjMsMzEzLjU4MjY2MyAyODkuNzc5MzMzLDI5My44ODIxNCBDMjcyLjA0MDkwMywyNzQuMTgxNjE4IDI0MS42OTA2MzUsMjcyLjU5MTAyNyAyMjEuOTkwMTEyLDI5MC4zMjk0NTggTDE2Ljg4MjE0MDIsNDc1LjAwOTUwNSBDMC44MzkyMzYyMDIsNDg5LjQ1NDYwMSAtMy4xOTQxMDE5OCw1MTIuMjYzMjEyIDUuNDQwNDY2NDUsNTMwLjg3MzQ0OCBDOC4wODMxMjU3OSw1MzcuNDc2MjcxIDEyLjIzOTg5NTksNTQzLjU5MTA2MSAxNy44ODIxNDAyLDU0OC42NzEzNjEgTDIyMi45OTAxMTIsNzMzLjM1MTQwOCBDMjQyLjY5MDYzNSw3NTEuMDg5ODM5IDI3My4wNDA5MDMsNzQ5LjQ5OTI0OCAyOTAuNzc5MzMzLDcyOS43OTg3MjYgQzMwOC41MTc3NjMsNzEwLjA5ODIwMyAzMDYuOTI3MTczLDY3OS43NDc5MzUgMjg3LjIyNjY1LDY2Mi4wMDk1MDUgTDExOS45NDcsNTExLjM5MDIzMSBaIE02NDkuNDkyMDk4LDEzNC4yNDM1NjYgQzY3NC40MDMwMzcsMTQzLjMxMDQwNyA2ODcuMjQ3MjE3LDE3MC44NTQ4NCA2NzguMTgwMzc3LDE5NS43NjU3NzkgTDQzNi4wMzAxMTUsODYxLjA2ODE1NSBDNDI2Ljk2MzI3NSw4ODUuOTc5MDk0IDM5OS40MTg4NDIsODk4LjgyMzI3NCAzNzQuNTA3OTAyLDg4OS43NTY0MzQgQzM0OS41OTY5NjMsODgwLjY4OTU5MyAzMzYuNzUyNzgzLDg1My4xNDUxNiAzNDUuODE5NjIzLDgyOC4yMzQyMjEgTDU4Ny45Njk4ODUsMTYyLjkzMTg0NSBMNTg3Ljk2OTg4NSwxNjIuOTMxODQ1IEM1OTcuMDM2NzI1LDEzOC4wMjA5MDYgNjI0LjU4MTE1OCwxMjUuMTc2NzI2IDY0OS40OTIwOTgsMTM0LjI0MzU2NiBaIiBpZD0iQ29tYmluZWQtU2hhcGUiPjwvcGF0aD4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg=="
                className={codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
                onClick={this.handleCodeExpand}
              />
            </span>
          </Tooltip>
        </section>
        <section
          className={highlightClass}
          key="code"
        >
          <div className="highlight">
            <div className="code-box-actions">
              <CopyToClipboard
                text={state.sourceCode}
                onCopy={this.handleCodeCopied}
              >
                <Tooltip
                  visible={state.copyTooltipVisible}
                  onVisibleChange={this.onCopyTooltipVisibleChange}
                  title={
                    <FormattedMessage
                      id={`app.demo.${state.copied ? 'copied' : 'copy'}`}
                    />
                  }
                >
                  <Icon
                    type={(state.copied && state.copyTooltipVisible) ? 'check' : 'copy'}
                    className="code-box-code-copy"
                  />
                </Tooltip>
              </CopyToClipboard>
            </div>
            {props.utils.toReactComponent(highlightedCode)}
          </div>
          {
            highlightedStyle ?
              <div key="style" className="highlight">
                <pre>
                  <code className="css" dangerouslySetInnerHTML={{ __html: highlightedStyle }} />
                </pre>
              </div> :
              null
          }
        </section>
      </section>
    );
  }
}

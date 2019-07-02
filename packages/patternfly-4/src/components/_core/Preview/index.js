import React from 'react';
import LinkPreview from '../../LinkPreview';
import ShadowDomPreview from '../../ShadowDomPreview';
import { CoreContext } from '../Documentation';
import './styles.scss';

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { 
      children, 
      fullPageOnly, 
      viewport = '', 
      lights = true, 
      minHeight, 
      heading, 
      className
    } = this.props;
    const endsWithSlash = typeof window !== 'undefined' && window.location.pathname.substr(-1) === '/';
    const fullPath = typeof window !== 'undefined' && `${window.location.pathname.substr(0, window.location.pathname.length - (endsWithSlash ? 1 : 0))}-full?component=${this.props.heading}`;
    const output = { __html: children };
    const background = lights ? '' : 'pf-t-dark pf-m-opaque-200';
    let preview;

    if (typeof window !== 'undefined' && window.location.search.length) {
      return (
        <CoreContext.Consumer>
          {({ coreClass }) => (
            <ShadowDomPreview className={`${background} ${coreClass} ${className}`} isFull>
              <div dangerouslySetInnerHTML={output} style={{height: '100%'}} />
            </ShadowDomPreview>
          )}
        </CoreContext.Consumer>
      );
    } else if (!fullPageOnly) {
      return (
        <CoreContext.Consumer>
          {({ coreClass }) => (
            <ShadowDomPreview className={`${background} ${coreClass} ${className}`}>
              <div className="Preview">
                <div className="Preview__body" style={{ minHeight: minHeight }} dangerouslySetInnerHTML={output} />
              </div>
            </ShadowDomPreview>
          )}
        </CoreContext.Consumer>
      )
    } else {
      return (
        <div className={`Preview ${viewport}`}>
          <LinkPreview name={heading} path={fullPath} />;
        </div>
      )
    }
  }
}

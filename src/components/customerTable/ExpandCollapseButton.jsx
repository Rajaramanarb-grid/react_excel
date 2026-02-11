import React from 'react';
import '@/components/customerTable/ExpandCollapseButton.scss';

class ExpandCollapseButton extends React.PureComponent {
  static defaultProps = {
    isExpanded: false,
    onClick: () => {}
  };

  render() {
    const { isExpanded, onClick } = this.props;

    return (
      <button
        type="button"
        className={`expand-collapse-btn expand-collapse-btn--${isExpanded ? 'collapse' : 'expand'}`}
        onClick={onClick}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
        title={isExpanded ? 'Collapse' : 'Expand'}
      >
        {isExpanded ? '−' : '+'}
      </button>
    );
  }
}

export default ExpandCollapseButton;

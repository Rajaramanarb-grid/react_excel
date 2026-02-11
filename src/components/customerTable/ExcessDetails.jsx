import React from 'react';
import '@/components/customerTable/ExcessDetails.scss';

class ExcessDetails extends React.PureComponent {
  static defaultProps = {
    labels: [],
    values: []
  };

  render() {
    const { labels, values } = this.props;

    if (!labels.length) {
      return null;
    }

    return (
      <dl className="excess-details-list">
        {labels.map((label, i) => (
          <div key={label} className="excess-details-item">
            <dt className="excess-details-label">{label}</dt>
            <dd className="excess-details-value">{values[i]}</dd>
          </div>
        ))}
      </dl>
    );
  }
}

export default ExcessDetails;

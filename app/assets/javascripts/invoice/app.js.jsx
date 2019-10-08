const MyExamplePlaceholderComponent = React.createClass({
  getInitialState: function () {
    return {
      loading: true
      , json_data: []
    };
  },

  componentDidMount: function () {
    var that = this;

    $.get('/invoice/index.json').done(function (json_data) {
      console.log("FYI: Here's the full placements_teaser_data.json contents: ", json_data);
      that.setState({
        json_data,
        loading: false
      });
    });
  },

  render: function () {
    var that = this;
    const {
      loading
    } = that.state;

    const tableData = that.state.json_data


    return (
      <div>
        {function () {
          if (loading) {
            return (
              <h3 className='text-muted'>
                <i className='fa fa-cog fa-spin' />Loading React.js Component&hellip;
              </h3>
            );
          } else {
            return (
              <Pagination data={tableData}></Pagination>
            );
          }
        }()}
      </div>
    );
  }
});

// TODO: exports pattern instead of inline usage.
(function () {
  setTimeout(function () {
    ReactDOM.render(
      <MyExamplePlaceholderComponent />,
      $('#pio-teaser-app')[0]
    );
  }, 500);    // Janky init code, perhaps you can refactor this!
})();



class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.paginationCount = 10;
    this.pageCount = Math.ceil(this.data.length / this.paginationCount);
    this.currentPage = 1;
    this.currentDataDisplay = this.data.slice(
      (this.currentPage - 1) * this.paginationCount,
      this.currentPage * this.paginationCount
    );

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);

  }

  nextPage() {
    this.currentPage = Math.min(this.currentPage+1, this.pageCount);
    this.currentDataDisplay = this.data.slice(
      (this.currentPage - 1) * this.paginationCount,
      this.currentPage * this.paginationCount
    );
  }
  prevPage() {
    this.currentPage = Math.max(this.currentPage-1, 1);
    this.currentDataDisplay = this.data.slice(
      (this.currentPage - 1) * this.paginationCount,
      this.currentPage * this.paginationCount
    );  }

  render() {
    let table = (
      <table className='custom-table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Line Item Name</th>
            <th>Campaign Name</th>
            <th>Booked Amount</th>
            <th>Actual Amount</th>
            <th>Adjustments</th>
          </tr>
        </thead>
        <FormattedLineItems items={this.currentDataDisplay}></FormattedLineItems>
        <tfoot>
          <tr>
            <th onClick={this.prevPage}>prev</th>
            <th>{this.currentPage}/{this.pageCount}</th>
            <th onClick={this.nextPage}>next</th>
          </tr>
        </tfoot>
      </table>
    )
    return table;
  }
}



function FormattedLineItems(props) {
  const formattedLineItems = props.items.map((lineItem) =>
    <tr key={lineItem.id}>
      <td>{lineItem.id}</td>
      <td>{lineItem.line_item_name}</td>
      <td>{lineItem.campaign_name}</td>
      <td>{lineItem.booked_amount}</td>
      <td>{lineItem.actual_amount}</td>
      <td>{lineItem.adjustments}</td>
    </tr>
  )
  return (<tbody>{formattedLineItems}</tbody>);
}

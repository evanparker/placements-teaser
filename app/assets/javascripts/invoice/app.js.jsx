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
    this.state = { currentDataDisplay: this.data.slice(
      (this.currentPage - 1) * this.paginationCount,
      this.currentPage * this.paginationCount
    ) };

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  nextPage() {
    this.setPage(Math.min(this.currentPage+1, this.pageCount));
  }
  prevPage() {
    this.setPage(Math.max(this.currentPage-1, 1));
  }
  setPage( page ) {
    page = Math.min( page, this.pageCount);
    page = Math.max( page, 1 );

    this.currentPage = page;
    this.setState( 
      { currentDataDisplay: this.data.slice( (this.currentPage - 1) * this.paginationCount, this.currentPage * this.paginationCount) }
    )
  }

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
        <FormattedLineItems items={this.state.currentDataDisplay}></FormattedLineItems>
        <tfoot>
          <tr>
            <td colSpan="6">
              <PageButton text="first" page="1" fn={this.setPage}></PageButton>
              { (this.currentPage - 3 > 0) ? <PageButton text={this.currentPage - 3} page={this.currentPage - 3} fn={this.setPage}></PageButton> : null }
              { (this.currentPage - 2 > 0) ? <PageButton text={this.currentPage - 2} page={this.currentPage - 2} fn={this.setPage}></PageButton> : null }
              { (this.currentPage - 1 > 0) ? <PageButton text={this.currentPage - 1} page={this.currentPage - 1} fn={this.setPage}></PageButton> : null }

              {this.currentPage}/{this.pageCount}

              { (this.currentPage + 1 > 0) ? <PageButton text={this.currentPage + 1} page={this.currentPage + 1} fn={this.setPage}></PageButton> : null }
              { (this.currentPage + 2 > 0) ? <PageButton text={this.currentPage + 2} page={this.currentPage + 2} fn={this.setPage}></PageButton> : null }
              { (this.currentPage + 3 > 0) ? <PageButton text={this.currentPage + 3} page={this.currentPage + 3} fn={this.setPage}></PageButton> : null }
              <PageButton text="last" page={this.pageCount} fn={this.setPage}></PageButton>
            </td>
          </tr>
        </tfoot>
      </table>
    )
    return table;
  }
}


function PageButton(props) {
  this.handleClick = function() {
    props.fn(props.page)
  }

  return (
    <button onClick={handleClick}>{props.text}</button>
  )
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

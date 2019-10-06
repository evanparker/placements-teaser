const MyExamplePlaceholderComponent = React.createClass({
  getInitialState: function() {
    return {
      loading: true
    , json_data: []
    };
  },

  componentDidMount: function() {
    var that = this;

    $.get('/invoice/index.json').done(function( json_data ){
      console.log("FYI: Here's the full placements_teaser_data.json contents: ", json_data);
      that.setState({
        json_data,
        loading: false
      });
    });
  },

  render: function() {
    var that = this;
    const {
      loading
    } = that.state;

    const formattedLineItems = that.state.json_data.slice(0,10).map( (lineItem) => 
      <LineItem key={lineItem.id} lineItem={lineItem}></LineItem>
    )

    return (
      <div>
        {function(){
          if ( loading ) {
            return (
              <h3 className='text-muted'>
                <i className='fa fa-cog fa-spin'/>Loading React.js Component&hellip;
              </h3>
            );
          } else {
            return (
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
                <tbody>
                  {formattedLineItems}
                </tbody>
                <tfoot>
                  <tr><td>TODO: Pagination Conttols</td></tr>
                </tfoot>
              </table>
            );
          }
        }()}
      </div>
    );
  }
});

// TODO: exports pattern instead of inline usage.
(function(){
  setTimeout(function(){
    ReactDOM.render(
      <MyExamplePlaceholderComponent/>,
      $('#pio-teaser-app')[0]
    );
  }, 500);    // Janky init code, perhaps you can refactor this!
})();


function LineItem(props) {
  return (
    <tr>
      <td>{props.lineItem.id}</td>
      <td>{props.lineItem.line_item_name}</td>
      <td>{props.lineItem.campaign_name}</td>
      <td>{props.lineItem.booked_amount}</td>
      <td>{props.lineItem.actual_amount}</td>
      <td>{props.lineItem.adjustments}</td>
    </tr>
  )
}
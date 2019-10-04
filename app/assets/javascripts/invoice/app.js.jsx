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

    const formattedLineItems = that.state.json_data.map( (lineItem) => 
      <tr>
        <td>{lineItem.id}</td>
        <td>{lineItem.line_item_name}</td>
        <td>{lineItem.campaign_name}</td>
        <td>{lineItem.booked_amount}</td>
        <td>{lineItem.actual_amount}</td>
        <td>{lineItem.adjustments}</td>
      </tr>
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
              <p>
                <table>
                {formattedLineItems}

                </table>
              </p>
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



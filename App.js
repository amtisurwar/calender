import * as React from 'react';
import * as RN from 'react-native';
import moment from 'moment';

var weekDataChangeDay
export default class MyCalendar extends React.Component {

  state = {
    activeDate: new Date(),
    months: ["January", "February", "March", "April",
      "May", "June", "July", "August", "September", "October",
      "November", "December"],
    weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    nDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    clickDate: '',
    showDateOnWeek: '',
    showDateOnWeek1: '',
    dayDate: '',
    dataShow: '',
  }


  generateMatrix() {
    var matrix = [];
    // Create header
    matrix[0] = this.state.weekDays;
    var year = this.state.activeDate.getFullYear();
    var month = this.state.activeDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = this.state.nDays[month];
    if (month == 1) { // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
          maxDays += 1;
      }
    }
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;

  }

  datarender() {
    var matrix = this.generateMatrix();
    var rows = [];
    rows = matrix.map((row, rowIndex) => {
      var rowItems = row.map((item, colIndex) => {
            var date, date1;
            var currentMonth = this.state.activeDate.getMonth() + 1
            if (item.toString().length === 1) {
                var date = (this.state.activeDate.getMonth() + 1) + "-" + "0" + item + "-" + this.state.activeDate.getFullYear()
            }
            if (currentMonth.toString().length === 1) {
                var date = "0" + (this.state.activeDate.getMonth()) + "-" + item + "-" + this.state.activeDate.getFullYear()
            }
            if (currentMonth.toString().length === 1 && item.toString().length === 1) {
                var date = "0" + (this.state.activeDate.getMonth()) + "-" + "0" + item + "-" + this.state.activeDate.getFullYear()
            }
            if (currentMonth.toString().length !== 1 && item.toString().length !== 1) {
                var date = (this.state.activeDate.getMonth() + 1) + "-" + item + "-" + this.state.activeDate.getFullYear()
            }
            //console.log(date)
            // console.log("ddddaaaaaaaaaaaaaaaaaaaaaaaaaa===>",this.state.arrayData);
            // {alert("dataaaaaass==>",this.state.arrayData)}
        return (
          <RN.Text
            style={{
              flex: 1,
              height: 18,
              textAlign: 'center',
              // Highlight header
              backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
              // Highlight Sundays
              color: colIndex == 0 ? '#a00' : '#000',
              // Highlight current date
              fontWeight: item == this.state.activeDate.getDate() ? 'bold' : ''
            }}
            onPress={() => this._onPress(item, date)}>
            {item != -1 ? item : ''}
          </RN.Text>
        );
      });
      return (
        <RN.View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 15,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {rowItems}
        </RN.View>
      );
    });
    return rows
  }

  // _onPress = (item) => {
  //   console.log('item', item)
  //   this.setState(() => {
  //     if (!item.match && item != -1) {
  //       this.state.activeDate.setDate(item);
  //       return this.state;
  //     }
  //   });
    
  // };


//   _onPress = (item, date) => {
//     this.setState({ date: date })
//     console.log('date', date)
// }

removeGmt(data) {
  var returnDate = data.replace(" 00:00:00 GMT+0530 (IST)", "")
  return returnDate
}

  _onPress = (item, date) => {
    // this.setState({ clickDate: item })
    //this.setState({ showDateOnWeek: date })
    // console.log('showDateOnWeek', this.state.showDateOnWeek)
    this.setState(() => {
    if (!item.match && item != -1) {
            this.state.activeDate.setDate(item);
            return this.state;
    }
   });
   this.setState(() => {
    if (!date.match && date != -1) {
            this.state.activeDate.setDate(date);
            return this.state;
    }
   });
   console.log('date', date)
   console.log('item', item)
}

  changeMonth = (n) => {
    this.setState(() => {
      this.state.activeDate.setMonth(
        this.state.activeDate.getMonth() + n
      )
      return this.state;
    });
  }

  render() {
    return (
      <RN.View>
        <RN.Text style={{
          fontWeight: 'bold',
          fontSize: 18,
          textAlign: 'center'
        }}>
          {this.state.months[this.state.activeDate.getMonth()]} &nbsp;
          {this.state.activeDate.getFullYear()}
        </RN.Text>
        {this.datarender()}
        <RN.Button title="Previous"
          onPress={() => this.changeMonth(-1)} />
        <RN.Button title="Next"
          onPress={() => this.changeMonth(+1)} />
      </RN.View>
    );
  }
}
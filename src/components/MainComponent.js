import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './Menucomponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Home from './HomeComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import {DISHES} from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
    };
  }

  render(){

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
        );
      };

    const Homepage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish)=> dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
             leader={this.state.leaders.filter((leader) => leader.featured)[0]}
             />
      );
    }
    return (
    <div>
    <Header />
        <Switch>
        <Route path='/home' component={Homepage} />
        <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
        <Route path='/menu/:dishId' component={DishWithId} />
        <Route exact path='/contactus' component={Contact} />
        <Route exact path='/aboutus' component={() => <About leaders={this.state.leaders} />} />
        <Redirect to="/home" />
        </Switch>
    <Footer />
    </div>
  );
}
}

export default Main;

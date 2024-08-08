import React, { useEffect } from 'react';
import { Switch, BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './dashboard/components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './dashboard/pages';
import './App.css';

import { useStateContext } from './dashboard/contexts/ContextProvider';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  function privateElementsRender() {
    return (
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}

              <Switch>
                {/* dashboard  */}
                {/* <Route exact path="/RH" component={Ecommerce} />
                <Route
                  exact
                  path="/RH/dashboard"
                  component={Ecommerce}
                /> */}

                {/* pages  */}
                 <Route exact path="/RH/profile" component={ColorPicker} />
                {/* <Route
                  exact
                  path="/RH/employees"
                  component={ColorPicker}
                /> */}
                {/* <Route
                  exact
                  path="/RH/Clients"
                  component={Stacked}
                />
                <Route
                  exact
                  path="/RH/clientsprofiles"
                  component={Calendar}
                />
                <Route
                  exact
                  path="/RH/opportunities"
                  component={Calendar}
                />  */}

                {/* apps  */}
                {/* <PrivateRoute exact path="/RH/kanban" component={Kanban} /> */}
                {/* <PrivateRoute path="/admin/editor" component={Editor } /> */}
                {/* <PrivateRoute exact path="/RH/calendar" component={Calendar} /> */}

                {/* ADMIN routes */}
                {/* <PrivateRoute exact path="/ADMIN/employees" component={RhEmployees} />
                <PrivateRoute exact path="/ADMIN/dashboard" component={Ecommerce} />
                <PrivateRoute path="/ADMIN/profile" component={AdminProfile } /> */}

               
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ColorPicker} />
        {privateElementsRender()}
      </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;

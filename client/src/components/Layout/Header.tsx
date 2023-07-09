import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import CreateOrderForm from "../Order/CreateOrderForm";

export default function Header() {
  const user = useSelector((state: RootState) => state.global.user);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <Navbar fluid rounded>
      <div className="flex">
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white mr-2">
            OrdersManagament
          </span>
        </Navbar.Brand>
        {user?.isManufacturer && <CreateOrderForm />}
      </div>
      <div className="flex md:order-2">
        <Dropdown
          inline
          label={
            <Avatar
              alt="User settings"
              img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAQlBMVEX///9useFmruCx1O2kzetirN/6/f59ueTM4vSs0e3l8PnT5vW31+/X6fZ2teNys+LB3PGUxOj0+f2Hvuafyuvt9ftDi0IAAAACpUlEQVRoge2b0ZarIAxFBRuoiIqV/v+vDtXpXKdTJSCx9yFnrb740N0TQ4TEVhWLxfovpUzrbGNda9TJ4NZrIUHK8BHat+fhldMB+U8StDuJ3mkQrwLdnoG+/CXP9As5+ablW3SIvL4Ro/stdID3pPBt1/TOxz10gI90aPs+zVYJZ6nQZt/17NwQsSMRp4y6iZIfojF+idsOxklKjBpQvgeKyt5hbAfjHQG7RrJrAvaEZE8E7B6FFqInYONsB+ME7Fg9fQrKoxWaXX6RMZvZzKZlf7K2VEi0EARsjURrArZHPkM9AfuKu+FwJWDfkb7vBGzcxoVk2xKCjmJThDxUF0yma6LmByLbSDJtVvRARngIvseOJgNJki/q9qMOFGeSH+3ecrqbvcjt9HocLbqq2o1Ok+xP6O7dxndxh5G4u/atboLf3iVMpFn2m+4H+OZLgMGfR37o1tXjpLWexro7J9ovUurkvv0ntRVhwnL6kDJ2GmCwfzF3G65Plmx2YppeykdySzG6FUUZN4r5upR9Q9HbM8v3Pxe00L521/bqaq/FarmH31WabkZ4LaUSwtIG+eZ6WXotsZ2emV6wx2Z67FnsKegLWXep5Jle5IFa56ADvDlMVj4PHeD+6GLfmMSh4Adb6U1Kfr9KHgp7VpqtnB9IuMiWGAHP3lSgDmD7yj6eNUdt5680xCgursxhHWIUh2BnnQ4PJ9qirHQrYjvPOG4CiVH6HT9U0dbKqG7YkVRcyUMr5AQSo+QpZbGQZwR9KoYWIrHdp8rZDsbTiropU1gWQdoqa4uy07oh0bdJkthpb54gB+04JR4VCi6x5EWGeqcDzU7bsDKb2cxmNrOZzWxmM5vZW/rkHrlQo2dRarunmf81U0KQ3vTobF1G9txBLYvF+tEXvv8k4mKuNEIAAAAASUVORK5CYII="
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user?.name}</span>
            <span className="block text-sm">
              {user?.isManufacturer ? "Manufacturer" : "Distributor"}
            </span>
            <span className="block truncate text-sm font-medium">
              {user?.email}
            </span>
          </Dropdown.Header>

          <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {/* <Navbar.Link active href="#">
          <p>Home</p>
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export  const routeTabNumber = (tabUser:string) => {
    switch (tabUser) {
      case "me": return 0
      case "myOrder": return 1
      case "users": return 2
      case "orders": return 3
      case "products": return 4
      case "logout": return 5

      default: return 0
    }
  }


  export  const routeTabString = (tabUser:number) => {
    switch (tabUser) {
      case 0: return "me"
      case 1: return "myOrder"
      case 2: return "users"
      case 3: return "orders"
      case 4: return "products"
      case 5: return "logout"

      default: return "me"
    }
  }
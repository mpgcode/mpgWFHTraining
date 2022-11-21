using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Security.Claims;
using System.Security.Permissions;
using System.Security.Principal;
using System.ServiceModel;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Zza.Data;
using Zza.Entities;

namespace Zza.Services
{
    [ServiceBehavior(InstanceContextMode=InstanceContextMode.PerCall)]
    public class ZzaService : IZzaService, IDisposable
    {
        readonly ZzaDbContext _Context = new ZzaDbContext();

        [PrincipalPermission(SecurityAction.Demand, Role = @"BUILTIN\Administrators")]
        public List<Product> GetProducts()
        {
            var principal = Thread.CurrentPrincipal;
            if (!principal.IsInRole(@"BUILTIN\Administrators"))
            {
                throw new SecurityException("Access Denied");
            }

            // Claims Examples
            bool isAdmin = ClaimsPrincipal.Current.IsInRole(@"Administrators");
            bool isPancake = ClaimsPrincipal.Current.IsInRole(@"Pancake");

            bool isSpecificaName = ClaimsPrincipal.Current.HasClaim(ClaimTypes.Name, @"ExampleComputer\username");

            if (isAdmin || isPancake || isSpecificaName)
            {
                // Allow etc...
            }
            if (ClaimsPrincipal.Current.Claims.Any(x => x.Type == ClaimTypes.Name || x.Value == @"MPG-DT2021\mpg"))
            {
                // Deny etc...
            }

            return _Context.Products.ToList();
        }

        public List<Customer> GetCustomers()
        {
            return _Context.Customers.ToList();
        }

        [OperationBehavior(TransactionScopeRequired = true)]
        public void SubmitOrder(Order order)
        {
            _Context.Orders.Add(order);
            order.OrderItems.ForEach(oi => _Context.OrderItems.Add(oi));
            _Context.SaveChanges();
        }

        public void Dispose()
        {
            _Context.Dispose();
        }
    }
}

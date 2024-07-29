import { HomePage } from "./pages/HomePage";
import { LoginPage } from './pages/LoginPage';
import { LayoutPage } from "./pages/LayoutPage";
import { ClientFormPage } from "./pages/Clients/ClientFormPage";
import { AdminPanelPage } from "./pages/AdminPanelPage";
import { CompanyFormPage } from "./pages/Companies/CompanyFormPage";
import { EmployeeFormPage } from "./pages/Employees/EmployeeFormPage";
import { ClientsInfosPage } from "./pages/Clients/ClientsInfosPage";
import { CompaniesInfosPage } from "./pages/Companies/CompaniesInfosPage";
import { EmployeesInfosPage } from "./pages/Employees/EmployeesInfosPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegistrationPanelPage } from "./pages/RegistrationPanelPage";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LayoutPage />}>
                    <Route index element={<HomePage />} />
                    <Route path='/admin-panel' element={<AdminPanelPage />} />
                    <Route path='/register-client' element={<ClientFormPage />}/>
                    <Route path='/infos-clients' element={<ClientsInfosPage />} />
                    <Route path='/infos-client/edit/:id' element={<ClientFormPage />}/>
                    <Route path='/register-employee' element={<EmployeeFormPage />}/>
                    <Route path='/infos-employees' element={<EmployeesInfosPage />}/>
                    <Route path='/infos-employee/edit/:id' element={<EmployeeFormPage />}/>
                    <Route path='/register-company' element={<CompanyFormPage />}/>
                    <Route path='/infos-companies' element={<CompaniesInfosPage />} />
                    <Route path='/infos-company/edit/:id' element={<CompanyFormPage />}/>
                    <Route path='/registration-panel' element={<RegistrationPanelPage />}/>
                </Route>
                
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    )
}

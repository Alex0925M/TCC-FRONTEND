import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { RegistrationPanelPage } from "./pages/RegistrationPanelPage";
import { RegistrationFormPage } from "./pages/RegistrationPanelPage/RegsistrationFormPage";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/' element={<PrivateRoute />}>
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
                    <Route path='/register-service' element={<RegistrationFormPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

// Componente de rota privada
function PrivateRoute() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <LayoutPage />;
}

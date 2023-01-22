import { NotFound } from "../../components/NotFound/NotFound"

export const NotFoundPage = ({setSearchQuery}) => {
    return (
        <NotFound title="Этого здесь нет..." buttonText="Перейти на главную страницу" setSearchQuery={setSearchQuery} />
    )
}
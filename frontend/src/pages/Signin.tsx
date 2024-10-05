import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export const Signin = () => {
    return (
        <div>
            {/* by default it will be single col but when it breaks lg breakpoint it has 2 cols */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <Auth type="signin"/>
                </div>
                <div className="hidden lg:block">
                    <Quote />
                </div>
            </div>
        </div>
    )
}
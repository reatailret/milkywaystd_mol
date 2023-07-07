namespace $.$$ {
	export class $milkywaystd_crud_demo_products_productrow extends $.$milkywaystd_crud_demo_products_productrow {
		
		@$mol_mem
		row_price() {
			return `${this.data()?.price}`;
		}
		@$mol_mem
		row_name() {
			return `${this.data()?.title}`;
		}
		@$mol_mem
		row_id() {
			
			this.editId = this.data()?.id
			return `${this.data()?.id}`;
		}
		@$mol_mem
		uiblocker(){
			try {
				this.data()
			} catch (error) {
				$mol_fail_catch(error)
			}
			return ''
		}
		@$mol_mem
		editArg(){
			try {
				this.data()
			} catch (error) {
				$mol_fail_catch(error)
			}
			if(this.editCallback){
				this.editCallback(this.editId)
			}
			return {
				examples_products_edititem:this.editId,
				examples_products_viewpage:'edit'
			}
		}
		@$mol_action
		ondelete(val?:any){
			if($mol_wire_sync(window).confirm('Подтвердите удаление')){
				if(this.deleteCallback)
				this.deleteCallback(this.editId)
				
			}
			
		}
		editId:any
	}
	
}


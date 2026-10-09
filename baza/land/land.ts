namespace $ {

	/**
	 * Land с выгрузкой нагрузки sand'ов.
	 *
	 * В базовом `$giper_baza_land` после `sand_open` / `sands_open` поля `_ball`
	 * и `_open` живут до конца жизни юнита — большие файлы (музыка) копят всю
	 * прослушанную сессию в JS-куче. Здесь можно отпустить payload, когда чанк
	 * уже скопирован в Blob / отдан стриму.
	 */
	export class $mws_baza_land extends $giper_baza_land {

		/**
		 * Сбросить расшифрованную и (для big) сырую нагрузку.
		 * Заголовок unit'а остаётся; повторный `sand_open` снова подтянет ball из IDB.
		 */
		sand_unload( sand: $giper_baza_unit_sand ) {
			sand._open = null
			// Мелкие sand'ы держат data() во view на буфер заголовка — обнулять
			// `_ball` нельзя: это не отдельный IDB-ball, а alias на data().
			if( sand.big() ) sand._ball = null!
		}

	}

}

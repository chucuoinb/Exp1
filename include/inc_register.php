<!--/**-->
<!-- * Created by PhpStorm.-->
<!-- * User: Nam-->
<!-- * Date: 4/18/2017-->
<!-- * Time: 1:23 PM-->
<!-- */-->
<div id="register">
    <form class="form" id="form_register" method="post" action="../php/storeUser.php" target="_blank" enctype="multipart/form-data">
        <div>
            <p class="title_register">Register Customers</p>

            <div id="field_name" class="field_register">
                <p class="title_input">Họ tên: <span>*</span></p>
                <div>
                    <input type="text" id="input_name" class="register_input" name="use_fullname">
                    <i class="fa fa-check register_validate" id="register_name_true" aria-hidden="true"></i>
                </div>

                <span class="register_error_field" id="register_name_error"></span>

            </div>

            <div id="field_email" class="field_register">
                <p class="title_input">Email: <span>*</span></p>
                <div>
                    <input type="text" id="input_email" class="register_input" name="use_email">
                    <i class="fa fa-check register_validate" aria-hidden="true" id="register_email_true"></i>
                </div>
                <span class="register_error_field" id="register_email_error"></span>
            </div>

            <div id="field_username" class="field_register">
                <p class="title_input">Tên đăng nhập: <span>*</span></p>
                <div>
                    <input type="text" id="input_username" class="register_input" name="use_username">
                    <i class="fa fa-check register_validate" aria-hidden="true" id="register_username_true"></i>
                </div>
                <span class="register_error_field" id="register_username_error"></span>
            </div>

            <div id="field_password" class="field_register">
                <p class="title_input">Mật khẩu: <span>*</span></p>
                <div>
                    <input type="password" id="input_password" class="register_input" name="use_password">
                    <i class="fa fa-check register_validate" aria-hidden="true" id="register_password_true"></i>
                </div>
                <span class="register_error_field" id="register_password_error"></span>
            </div>

            <div id="field_password2" class="field_register">
                <p class="title_input">Nhập lại mật khẩu: <span>*</span></p>
                <div>
                    <input type="password" id="input_password_2" class="register_input">
                    <i class="fa fa-check register_validate" aria-hidden="true" id="register_password_true2"></i>
                </div>
                <span class="register_error_field" id="register_password_error2"></span>
            </div>

            <div id="field_address" class="field_register">
                <p class="title_input">Địa chỉ: <span>*</span></p>
                <div>
                    <input type="text" id="input_address" class="register_input" name="use_address">
                    <i class="fa fa-check register_validate" aria-hidden="true" id="register_address_true"></i>
                </div>
                <span class="register_error_field" id="register_address_error"></span>
            </div>

            <div id="field_phone_number" class="field_register">
                <p class="title_input">Số điện thoại: <span>*</span></p>
                <div>
                    <input type="text" id="input_phone_number" class="register_input" name="use_phone_number">
                    <i class="fa fa-check register_validate" aria-hidden="true" id="register_phone_true"></i>
                </div>
                <span class="register_error_field" id="register_phone_error"></span>
            </div>

            <div id="field_gender" class="field_register">
                <p class="title_input">Giới tính: <span>*</span></p>
                <div>
                    <input type="radio" name="use_gender" value="0" checked="checked"> Nam
                    <input type="radio" name="use_gender" value="1"> Nữ
                </div>
            </div>

            <div id="field_birthday" class="field_register">
                <p class="title_input">Ngày sinh: <span>*</span></p>
                <div>
                    <select name="" id="day">
                        <option value="1" id="day1">1</option>

                    </select>
                    <select name="" id="month">
                        <option id="month1" value="1">1</option>
                    </select>
                    <select name="" id="year" >
                        <option id="year1" value="1960">1960</option>
                    </select>
                    <input type="text" name="use_birthday" hidden="true" id="input_birthday">
                    <p>(dd/mm/yyyy) <br></p>
                </div>
                <br>
                <span class="" id="register_birthday_error"></span>
            </div>

            <div id="field_note" class="field_register">
                <p class="title_input">Mô tả: <span>*</span></p>
                <div>
                    <textarea id="input_note" class="register_input" name="use_description"></textarea>
                </div>
                <span class="register_error_field" id="register_note_error"></span>
            </div>

            <div id="field_avatar" class="field_register">
                <p class="title_input">Ảnh đại diện: <span>*</span></p>
                <div >
                    <div id="input_avatar">
                        <img id="img_avatar"  alt="" >
                    </div>
                    <input type="file" value="Chọn ảnh" id="bt_choose_ava" accept="image/*" name="use_avatar">
                </div>
                <span class="register_error_field" id="register_avatar_error"></span>
            </div>

            <input type="submit" value="Register" id="submit_register">
        </div>
    </form>
</div>